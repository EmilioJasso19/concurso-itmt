import spaceRepository from '../repositories/space.repository.js';
import { NotFoundError } from '../utils/errors.js';

export async function getAll() {
  return spaceRepository.findAll();
}

export async function getById(id) {
  const space = await spaceRepository.findById(id);
  if (!space) throw new NotFoundError('Space not found');
  return space;
}

export async function create({ name, type, location, capacity }) {
  const id = await spaceRepository.create({ name, type, location, capacity });
  return spaceRepository.findById(id);
}

export async function update(id, { name, type, location, capacity, isActive }) {
  await getById(id);
  const fields = {};
  if (name     !== undefined) fields.name      = name;
  if (type     !== undefined) fields.type      = type;
  if (location !== undefined) fields.location  = location;
  if (capacity !== undefined) fields.capacity  = capacity;
  if (isActive !== undefined) fields.is_active = Number(isActive);
  await spaceRepository.update(id, fields);
  return spaceRepository.findById(id);
}

export async function updateStatus(id, status) {
  await getById(id);
  await spaceRepository.updateStatus(id, status);
  return spaceRepository.findById(id);
}

export async function deactivate(id) {
  await getById(id);
  await spaceRepository.deactivate(id);
}
