import bcrypt from 'bcryptjs';
import userRepository from '../repositories/user.repository.js';
import { NotFoundError } from '../utils/errors.js';

export async function getAll() {
  return userRepository.findAll();
}

export async function getById(id) {
  const user = await userRepository.findById(id);
  if (!user) throw new NotFoundError('User not found');
  return user;
}

export async function create({ name, username, password, role }) {
  const hash = await bcrypt.hash(password, 10);
  const id = await userRepository.create({ name, username, password: hash, role });
  return userRepository.findById(id);
}

export async function update(id, { name, username, password, role, isActive }) {
  await getById(id);
  const fields = {};
  if (name     !== undefined) fields.name      = name;
  if (username !== undefined) fields.username  = username;
  if (password !== undefined) fields.password  = await bcrypt.hash(password, 10);
  if (role     !== undefined) fields.role      = role;
  if (isActive !== undefined) fields.is_active = Number(isActive);
  await userRepository.update(id, fields);
  return userRepository.findById(id);
}

export async function deactivate(id) {
  await getById(id);
  await userRepository.deactivate(id);
}
