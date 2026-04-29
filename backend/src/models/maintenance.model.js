import Database from '../config/database.js';

const db = Database.getInstance();

const SAFE_UPDATE_FIELDS = new Set([
  'failure_type', 'priority', 'description', 'progress',
  'notes', 'start_date', 'end_date', 'assigned_to', 'status', 'updated_by',
]);

export default {
  async findAll() {
    return db.query(`
      SELECT m.*, sp.name AS space_name,
             u.name  AS created_by_name,
             ua.name AS assigned_to_name,
             uu.name AS updated_by_name
      FROM maintenance m
      JOIN spaces sp      ON sp.id = m.space_id
      JOIN users  u       ON u.id  = m.created_by
      LEFT JOIN users ua  ON ua.id = m.assigned_to
      LEFT JOIN users uu  ON uu.id = m.updated_by
      ORDER BY m.created_at DESC
    `);
  },

  async findById(id) {
    const rows = await db.query(`
      SELECT m.*, sp.name AS space_name,
             u.name  AS created_by_name,
             ua.name AS assigned_to_name,
             uu.name AS updated_by_name
      FROM maintenance m
      JOIN spaces sp      ON sp.id = m.space_id
      JOIN users  u       ON u.id  = m.created_by
      LEFT JOIN users ua  ON ua.id = m.assigned_to
      LEFT JOIN users uu  ON uu.id = m.updated_by
      WHERE m.id = ?
    `, [id]);
    return rows[0] ?? null;
  },

  async findBySpace(spaceId) {
    return db.query(
      'SELECT * FROM maintenance WHERE space_id = ? ORDER BY created_at DESC',
      [spaceId]
    );
  },

  async create({ spaceId, failureType, priority, description, startDate, assignedTo = null, createdBy }) {
    const result = await db.query(
      `INSERT INTO maintenance
        (space_id, failure_type, priority, description, start_date, assigned_to, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [spaceId, failureType, priority, description, startDate, assignedTo, createdBy]
    );
    return result.insertId;
  },

  async update(id, fields) {
    const entries = Object.entries(fields).filter(([k]) => SAFE_UPDATE_FIELDS.has(k));
    if (!entries.length) throw new Error('No valid fields to update');
    const set = entries.map(([k]) => `${k} = ?`).join(', ');
    const values = entries.map(([, v]) => v);
    await db.query(`UPDATE maintenance SET ${set} WHERE id = ?`, [...values, id]);
  },
};
