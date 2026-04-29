import scheduleRepository from '../repositories/schedule.repository.js';
import { NotFoundError } from '../utils/errors.js';

export async function getAll() {
  return scheduleRepository.findAll();
}

export async function getById(id) {
  const schedule = await scheduleRepository.findById(id);
  if (!schedule) throw new NotFoundError('Schedule not found');
  return schedule;
}

export async function getBySpace(spaceId) {
  return scheduleRepository.findBySpace(spaceId);
}

export async function getByTeacher(teacherId) {
  return scheduleRepository.findByTeacher(teacherId);
}

export async function create({ program, subject, teacherId, groupName, day, startTime, endTime, spaceId, createdBy }) {
  const id = await scheduleRepository.create({ program, subject, teacherId, groupName, day, startTime, endTime, spaceId, createdBy });
  return scheduleRepository.findById(id);
}

export async function update(id, { program, subject, teacherId, groupName, day, startTime, endTime, spaceId }) {
  await getById(id);
  const fields = {};
  if (program   !== undefined) fields.program    = program;
  if (subject   !== undefined) fields.subject    = subject;
  if (teacherId !== undefined) fields.teacher_id = teacherId;
  if (groupName !== undefined) fields.group_name = groupName;
  if (day       !== undefined) fields.day        = day;
  if (startTime !== undefined) fields.start_time = startTime;
  if (endTime   !== undefined) fields.end_time   = endTime;
  if (spaceId   !== undefined) fields.space_id   = spaceId;
  await scheduleRepository.update(id, fields);
  return scheduleRepository.findById(id);
}

export async function deactivate(id) {
  await getById(id);
  await scheduleRepository.deactivate(id);
}
