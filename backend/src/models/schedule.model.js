import Database from '../config/database.js';

const db = Database.getInstance();

const SAFE_UPDATE_FIELDS = new Set([
  'program', 'subject', 'teacher_id', 'group_name',
  'day', 'start_time', 'end_time', 'space_id', 'is_active',
]);

export default {
  async findAll() {
    return db.query(`
      SELECT s.*, u.name AS teacher_name, sp.name AS space_name
      FROM schedules s
      JOIN users  u  ON u.id  = s.teacher_id
      JOIN spaces sp ON sp.id = s.space_id
      WHERE s.is_active = 1
      ORDER BY s.day, s.start_time
    `);
  },

  async findById(id) {
    const rows = await db.query(`
      SELECT s.*, u.name AS teacher_name, sp.name AS space_name
      FROM schedules s
      JOIN users  u  ON u.id  = s.teacher_id
      JOIN spaces sp ON sp.id = s.space_id
      WHERE s.id = ?
    `, [id]);
    return rows[0] ?? null;
  },

  async findBySpace(spaceId) {
    return db.query(
      'SELECT * FROM schedules WHERE space_id = ? AND is_active = 1 ORDER BY day, start_time',
      [spaceId]
    );
  },

  async findByTeacher(teacherId) {
    return db.query(
      'SELECT * FROM schedules WHERE teacher_id = ? AND is_active = 1 ORDER BY day, start_time',
      [teacherId]
    );
  },

  // Returns conflicting rows for the given space/day/time window (excludes excludeId when provided)
  async findConflict({ spaceId, day, startTime, endTime, excludeId = null }) {
    const sql = `
      SELECT id FROM schedules
      WHERE space_id = ? AND day = ? AND is_active = 1
        AND start_time < ? AND end_time > ?
        ${excludeId !== null ? 'AND id <> ?' : ''}
    `;
    const params = excludeId !== null
      ? [spaceId, day, endTime, startTime, excludeId]
      : [spaceId, day, endTime, startTime];
    return db.query(sql, params);
  },

  async create({ program, subject, teacherId, groupName, day, startTime, endTime, spaceId, createdBy }) {
    const result = await db.query(
      `INSERT INTO schedules
        (program, subject, teacher_id, group_name, day, start_time, end_time, space_id, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [program, subject, teacherId, groupName, day, startTime, endTime, spaceId, createdBy]
    );
    return result.insertId;
  },

  async update(id, fields) {
    const entries = Object.entries(fields).filter(([k]) => SAFE_UPDATE_FIELDS.has(k));
    if (!entries.length) throw new Error('No valid fields to update');
    const set = entries.map(([k]) => `${k} = ?`).join(', ');
    const values = entries.map(([, v]) => v);
    await db.query(`UPDATE schedules SET ${set} WHERE id = ?`, [...values, id]);
  },

  async deactivate(id) {
    await db.query('UPDATE schedules SET is_active = 0 WHERE id = ?', [id]);
  },
};
