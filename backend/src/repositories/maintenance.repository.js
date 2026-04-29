import maintenanceModel from '../models/maintenance.model.js';
import Database from '../config/database.js';
import logger from '../utils/logger.js';
import { BadRequestError } from '../utils/errors.js';

const SAFE_FIELDS = new Set([
  'failure_type', 'priority', 'description', 'progress',
  'notes', 'start_date', 'end_date', 'assigned_to', 'status', 'updated_by',
]);

const CLOSING_STATUSES = new Set(['closed', 'cancelled']);

function mapDbError(err) {
  if (err.code === 'ER_NO_REFERENCED_ROW_2') throw new BadRequestError('A referenced space or user does not exist');
  throw err;
}

function buildSet(fields) {
  const entries = Object.entries(fields).filter(([k]) => SAFE_FIELDS.has(k));
  if (!entries.length) throw new Error('No valid fields to update');
  return {
    set: entries.map(([k]) => `${k} = ?`).join(', '),
    values: entries.map(([, v]) => v),
  };
}

export default {
  findAll() {
    return maintenanceModel.findAll();
  },

  findById(id) {
    return maintenanceModel.findById(id);
  },

  findBySpace(spaceId) {
    return maintenanceModel.findBySpace(spaceId);
  },

  async create({ spaceId, failureType, priority, description, startDate, assignedTo = null, createdBy }) {
    const db = Database.getInstance();
    try {
      const insertId = await db.transaction(async (conn) => {
        const [result] = await conn.execute(
          `INSERT INTO maintenance (space_id, failure_type, priority, description, start_date, assigned_to, created_by)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [spaceId, failureType, priority, description, startDate, assignedTo, createdBy]
        );
        await conn.execute(`UPDATE spaces SET status = 'maintenance' WHERE id = ?`, [spaceId]);
        return result.insertId;
      });
      logger.debug('maintenance.create', { spaceId });
      return insertId;
    } catch (err) {
      mapDbError(err);
    }
  },

  async update(id, fields) {
    const isClosing = CLOSING_STATUSES.has(fields.status);

    if (!isClosing) {
      try {
        await maintenanceModel.update(id, fields);
        logger.debug('maintenance.update', { id });
      } catch (err) {
        mapDbError(err);
      }
      return;
    }

    const record = await maintenanceModel.findById(id);
    if (!record) return;

    const db = Database.getInstance();
    const { set, values } = buildSet(fields);

    try {
      await db.transaction(async (conn) => {
        await conn.execute(`UPDATE maintenance SET ${set} WHERE id = ?`, [...values, id]);

        const [rows] = await conn.execute(
          `SELECT COUNT(*) AS count FROM maintenance
           WHERE space_id = ? AND status IN ('open','in_progress') AND id <> ?`,
          [record.space_id, id]
        );

        if (rows[0].count === 0) {
          await conn.execute(`UPDATE spaces SET status = 'available' WHERE id = ?`, [record.space_id]);
        }
      });
      logger.debug('maintenance.update', { id });
    } catch (err) {
      mapDbError(err);
    }
  },
};
