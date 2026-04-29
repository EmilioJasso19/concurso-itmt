import userModel from '../models/user.model.js';
import logger from '../utils/logger.js';
import { ConflictError } from '../utils/errors.js';

function mapDbError(err) {
  if (err.code === 'ER_DUP_ENTRY') throw new ConflictError('Username already taken');
  throw err;
}

export default {
  findAll() {
    return userModel.findAll();
  },

  findById(id) {
    return userModel.findById(id);
  },

  findByUsername(username) {
    return userModel.findByUsername(username);
  },

  async create({ name, username, password, role }) {
    try {
      const id = await userModel.create({ name, username, password, role });
      logger.debug('user.create', { username });
      return id;
    } catch (err) {
      mapDbError(err);
    }
  },

  async update(id, fields) {
    try {
      await userModel.update(id, fields);
      logger.debug('user.update', { id });
    } catch (err) {
      mapDbError(err);
    }
  },

  async deactivate(id) {
    try {
      await userModel.deactivate(id);
      logger.debug('user.deactivate', { id });
    } catch (err) {
      throw err;
    }
  },
};
