import Database from '../config/database.js';

const db = Database.getInstance();

const SAFE_UPDATE_FIELDS = new Set(['name', 'type', 'location', 'capacity', 'status', 'is_active']);

export default {
  async findAll() {
    return db.query(
      'SELECT id, name, type, location, capacity, status, is_active, created_at, updated_at FROM spaces WHERE is_active = 1 ORDER BY name'
    );
  },

  async findById(id) {
    const rows = await db.query(
      'SELECT id, name, type, location, capacity, status, is_active, created_at, updated_at FROM spaces WHERE id = ?',
      [id]
    );
    return rows[0] ?? null;
  },

  async create({ name, type, location, capacity }) {
    const result = await db.query(
      'INSERT INTO spaces (name, type, location, capacity) VALUES (?, ?, ?, ?)',
      [name, type, location, capacity]
    );
    return result.insertId;
  },

  async update(id, fields) {
    const entries = Object.entries(fields).filter(([k]) => SAFE_UPDATE_FIELDS.has(k));
    if (!entries.length) throw new Error('No valid fields to update');
    const set = entries.map(([k]) => `${k} = ?`).join(', ');
    const values = entries.map(([, v]) => v);
    await db.query(`UPDATE spaces SET ${set} WHERE id = ?`, [...values, id]);
  },

  async updateStatus(id, status) {
    await db.query('UPDATE spaces SET status = ? WHERE id = ?', [status, id]);
  },

  async deactivate(id) {
    await db.query('UPDATE spaces SET is_active = 0 WHERE id = ?', [id]);
  },
};
