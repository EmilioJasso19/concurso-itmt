import incidentModel from '../models/incident.model.js';
import logger from '../utils/logger.js';
import { BadRequestError } from '../utils/errors.js';

function mapDbError(err) {
  if (err.code === 'ER_NO_REFERENCED_ROW_2') throw new BadRequestError('A referenced space or user does not exist');
  throw err;
}

export default {
  findAll() {
    return incidentModel.findAll();
  },

  findById(id) {
    return incidentModel.findById(id);
  },

  findBySpace(spaceId) {
    return incidentModel.findBySpace(spaceId);
  },

  async create({ type, spaceId, date, description, createdBy }) {
    try {
      const id = await incidentModel.create({ type, spaceId, date, description, createdBy });
      logger.debug('incident.create', { spaceId });
      return id;
    } catch (err) {
      mapDbError(err);
    }
  },

  async update(id, fields) {
    try {
      await incidentModel.update(id, fields);
      logger.debug('incident.update', { id });
    } catch (err) {
      mapDbError(err);
    }
  },
};
