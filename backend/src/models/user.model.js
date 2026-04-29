import Database from '../config/database.js';

const db = Database.getInstance();

const SAFE_UPDATE_FIELDS = new Set(['name', 'username', 'password', 'role', 'is_active']);

export default {
  async findAll() {
    return db.query(
      'SELECT id, name, username, role, is_active, created_at, updated_at FROM users WHERE is_active = 1 ORDER BY name'
    );
  },

  async findById(id) {
    const rows = await db.query(
      'SELECT id, name, username, role, is_active, created_at, updated_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0] ?? null;
  },

  async findByUsername(username) {
    const rows = await db.query(
      'SELECT id, name, username, password, role, is_active FROM users WHERE username = ?',
      [username]
    );
    return rows[0] ?? null;
  },

  async create({ name, username, password, role }) {
    const result = await db.query(
      'INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?)',
      [name, username, password, role]
    );
    return result.insertId;
  },

  async update(id, fields) {
    const entries = Object.entries(fields).filter(([k]) => SAFE_UPDATE_FIELDS.has(k));
    if (!entries.length) throw new Error('No valid fields to update');
    const set = entries.map(([k]) => `${k} = ?`).join(', ');
    const values = entries.map(([, v]) => v);
    await db.query(`UPDATE users SET ${set} WHERE id = ?`, [...values, id]);
  },

  async deactivate(id) {
    await db.query('UPDATE users SET is_active = 0 WHERE id = ?', [id]);
  },
};
