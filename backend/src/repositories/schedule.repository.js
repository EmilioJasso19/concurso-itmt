import scheduleModel from '../models/schedule.model.js';
import logger from '../utils/logger.js';
import { ConflictError, BadRequestError } from '../utils/errors.js';

function mapDbError(err) {
  if (err.code === 'ER_DUP_ENTRY') throw new ConflictError('Schedule conflict');
  if (err.code === 'ER_NO_REFERENCED_ROW_2') throw new BadRequestError('Referenced space or teacher does not exist');
  throw err;
}

const TIME_FIELDS = new Set(['space_id', 'day', 'start_time', 'end_time']);

export default {
  findAll() {
    return scheduleModel.findAll();
  },

  findById(id) {
    return scheduleModel.findById(id);
  },

  findBySpace(spaceId) {
    return scheduleModel.findBySpace(spaceId);
  },

  findByTeacher(teacherId) {
    return scheduleModel.findByTeacher(teacherId);
  },

  async create({ program, subject, teacherId, groupName, day, startTime, endTime, spaceId, createdBy }) {
    const conflicts = await scheduleModel.findConflict({ spaceId, day, startTime, endTime });
    if (conflicts.length > 0) {
      throw new ConflictError('Schedule conflict: space already booked for this time slot');
    }

    try {
      const id = await scheduleModel.create({ program, subject, teacherId, groupName, day, startTime, endTime, spaceId, createdBy });
      logger.debug('schedule.create', { spaceId, day, startTime, endTime });
      return id;
    } catch (err) {
      mapDbError(err);
    }
  },

  async update(id, fields) {
    const touchesTime = Object.keys(fields).some(k => TIME_FIELDS.has(k));

    if (touchesTime) {
      const current = await scheduleModel.findById(id);
      if (current) {
        const spaceId   = fields.space_id    ?? current.space_id;
        const day       = fields.day         ?? current.day;
        const startTime = fields.start_time  ?? current.start_time;
        const endTime   = fields.end_time    ?? current.end_time;

        const conflicts = await scheduleModel.findConflict({ spaceId, day, startTime, endTime, excludeId: id });
        if (conflicts.length > 0) {
          throw new ConflictError('Schedule conflict: space already booked for this time slot');
        }
      }
    }

    try {
      await scheduleModel.update(id, fields);
      logger.debug('schedule.update', { id });
    } catch (err) {
      mapDbError(err);
    }
  },

  async deactivate(id) {
    try {
      await scheduleModel.deactivate(id);
      logger.debug('schedule.deactivate', { id });
    } catch (err) {
      throw err;
    }
  },
};
