import mysql from 'mysql2/promise';
import logger from '../utils/logger.js';

class Database {
  constructor() {
    if (Database._instance) {
      return Database._instance;
    }

    this._pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
      waitForConnections: true,
      // OWASP A02 — encrypted connection in production
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : undefined,
    });

    Database._instance = this;
    logger.info('Database pool initialized');
  }

  static getInstance() {
    if (!Database._instance) {
      new Database();
    }
    return Database._instance;
  }

  // OWASP A03 — parameterized queries only; never interpolate user input
  async query(sql, params = []) {
    const [rows] = await this._pool.execute(sql, params);
    return rows;
  }

  async transaction(callback) {
    const connection = await this._pool.getConnection();
    await connection.beginTransaction();
    try {
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  async end() {
    await this._pool.end();
    Database._instance = null;
  }
}

export default Database;
