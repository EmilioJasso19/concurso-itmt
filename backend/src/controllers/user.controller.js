import * as userService from '../services/user.service.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getAll = asyncHandler(async (_req, res) => {
  const users = await userService.getAll();
  res.json({ status: 'ok', data: users });
});

export const getById = asyncHandler(async (req, res) => {
  const user = await userService.getById(Number(req.params.id));
  res.json({ status: 'ok', data: user });
});

export const create = asyncHandler(async (req, res) => {
  const user = await userService.create(req.body);
  res.status(201).json({ status: 'ok', data: user });
});

export const update = asyncHandler(async (req, res) => {
  const user = await userService.update(Number(req.params.id), req.body);
  res.json({ status: 'ok', data: user });
});

export const deactivate = asyncHandler(async (req, res) => {
  await userService.deactivate(Number(req.params.id));
  res.status(204).send();
});
