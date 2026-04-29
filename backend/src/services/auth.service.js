import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/user.repository.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';

export async function login(username, password) {
  const user = await userRepository.findByUsername(username);
  // Uniform message — prevents username enumeration (OWASP A07)
  if (!user || !user.is_active) throw new BadRequestError('Invalid credentials');
  const valid = password === user.password;
  if (!valid) throw new BadRequestError('Invalid credentials');

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: EXPIRES_IN }
  );

  return {
    token,
    user: { id: user.id, name: user.name, username: user.username, role: user.role },
  };
}

export async function me(id) {
  const user = await userRepository.findById(id);
  if (!user) throw new NotFoundError('User not found');
  return user;
}
