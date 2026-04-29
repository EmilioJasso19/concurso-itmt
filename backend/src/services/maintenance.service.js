import maintenanceRepository from '../repositories/maintenance.repository.js';
import { NotFoundError } from '../utils/errors.js';

export async function getAll() {
  return maintenanceRepository.findAll();
}

export async function getById(id) {
  const record = await maintenanceRepository.findById(id);
  if (!record) throw new NotFoundError('Maintenance record not found');
  return record;
}

export async function getBySpace(spaceId) {
  return maintenanceRepository.findBySpace(spaceId);
}

export async function create({ spaceId, failureType, priority, description, startDate, assignedTo }, userId) {
  const id = await maintenanceRepository.create({ spaceId, failureType, priority, description, startDate, assignedTo, createdBy: userId });
  return maintenanceRepository.findById(id);
}

export async function update(id, { failureType, priority, description, progress, notes, startDate, endDate, assignedTo, status }, userId) {
  await getById(id);
  const fields = { updated_by: userId };
  if (failureType  !== undefined) fields.failure_type = failureType;
  if (priority     !== undefined) fields.priority     = priority;
  if (description  !== undefined) fields.description  = description;
  if (progress     !== undefined) fields.progress     = progress;
  if (notes        !== undefined) fields.notes        = notes;
  if (startDate    !== undefined) fields.start_date   = startDate;
  if (endDate      !== undefined) fields.end_date     = endDate;
  if (assignedTo   !== undefined) fields.assigned_to  = assignedTo;
  if (status       !== undefined) fields.status       = status;
  await maintenanceRepository.update(id, fields);
  return maintenanceRepository.findById(id);
}
