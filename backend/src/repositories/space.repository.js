import spaceModel from '../models/space.model.js';
import logger from '../utils/logger.js';
import { ConflictError } from '../utils/errors.js';

function mapDbError(err) {
  if (err.code === 'ER_DUP_ENTRY') throw new ConflictError('Space already exists');
  throw err;
}

export default {
  findAll() {
    return spaceModel.findAll();
  },

  findById(id) {
    return spaceModel.findById(id);
  },

  async create({ name, type, location, capacity }) {
    try {
      const id = await spaceModel.create({ name, type, location, capacity });
      logger.debug('space.create', { name });
      return id;
    } catch (err) {
      mapDbError(err);
    }
  },

  async update(id, fields) {
    try {
      await spaceModel.update(id, fields);
      logger.debug('space.update', { id });
    } catch (err) {
      mapDbError(err);
    }
  },

  async updateStatus(id, status) {
    try {
      await spaceModel.updateStatus(id, status);
      logger.debug('space.updateStatus', { id, status });
    } catch (err) {
      throw err;
    }
  },

  async deactivate(id) {
    try {
      await spaceModel.deactivate(id);
      logger.debug('space.deactivate', { id });
    } catch (err) {
      throw err;
    }
  },
};
