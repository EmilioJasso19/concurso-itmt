import * as authService from '../services/auth.service.js';
import asyncHandler from '../utils/asyncHandler.js';

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const result = await authService.login(username, password);
  res.json({ status: 'ok', data: result });
});

export const me = asyncHandler(async (req, res) => {
  const user = await authService.me(req.user.id);
  res.json({ status: 'ok', data: user });
});

export const logout = (_req, res) => {
  res.json({ status: 'ok', message: 'Logged out successfully.' });
};
