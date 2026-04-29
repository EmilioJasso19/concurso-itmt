import incidentRepository from '../repositories/incident.repository.js';
import { NotFoundError } from '../utils/errors.js';

export async function getAll() {
  return incidentRepository.findAll();
}

export async function getById(id) {
  const incident = await incidentRepository.findById(id);
  if (!incident) throw new NotFoundError('Incident not found');
  return incident;
}

export async function getBySpace(spaceId) {
  return incidentRepository.findBySpace(spaceId);
}

export async function create({ type, spaceId, date, description }, userId) {
  const id = await incidentRepository.create({ type, spaceId, date, description, createdBy: userId });
  return incidentRepository.findById(id);
}

export async function update(id, { type, spaceId, date, description, status }, userId) {
  await getById(id);
  const fields = { updated_by: userId };
  if (type        !== undefined) fields.type        = type;
  if (spaceId     !== undefined) fields.space_id    = spaceId;
  if (date        !== undefined) fields.date        = date;
  if (description !== undefined) fields.description = description;
  if (status      !== undefined) fields.status      = status;
  await incidentRepository.update(id, fields);
  return incidentRepository.findById(id);
}
