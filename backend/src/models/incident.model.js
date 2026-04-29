import Database from '../config/database.js';

const db = Database.getInstance();

const SAFE_UPDATE_FIELDS = new Set(['type', 'space_id', 'date', 'description', 'status', 'updated_by']);

export default {
  async findAll() {
    return db.query(`
      SELECT i.*, sp.name AS space_name,
             u.name  AS created_by_name,
             uu.name AS updated_by_name
      FROM incidents i
      JOIN spaces sp ON sp.id = i.space_id
      JOIN users  u  ON u.id  = i.created_by
      LEFT JOIN users uu ON uu.id = i.updated_by
      ORDER BY i.created_at DESC
    `);
  },

  async findById(id) {
    const rows = await db.query(`
      SELECT i.*, sp.name AS space_name,
             u.name  AS created_by_name,
             uu.name AS updated_by_name
      FROM incidents i
      JOIN spaces sp ON sp.id = i.space_id
      JOIN users  u  ON u.id  = i.created_by
      LEFT JOIN users uu ON uu.id = i.updated_by
      WHERE i.id = ?
    `, [id]);
    return rows[0] ?? null;
  },

  async findBySpace(spaceId) {
    return db.query(
      'SELECT * FROM incidents WHERE space_id = ? ORDER BY created_at DESC',
      [spaceId]
    );
  },

  async create({ type, spaceId, date, description, createdBy }) {
    const result = await db.query(
      'INSERT INTO incidents (type, space_id, date, description, created_by) VALUES (?, ?, ?, ?, ?)',
      [type, spaceId, date, description, createdBy]
    );
    return result.insertId;
  },

  async update(id, fields) {
    const entries = Object.entries(fields).filter(([k]) => SAFE_UPDATE_FIELDS.has(k));
    if (!entries.length) throw new Error('No valid fields to update');
    const set = entries.map(([k]) => `${k} = ?`).join(', ');
    const values = entries.map(([, v]) => v);
    await db.query(`UPDATE incidents SET ${set} WHERE id = ?`, [...values, id]);
  },
};
