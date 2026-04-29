import * as spaceService from '../services/space.service.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getAll = asyncHandler(async (_req, res) => {
  const spaces = await spaceService.getAll();
  res.json({ status: 'ok', data: spaces });
});

export const getById = asyncHandler(async (req, res) => {
  const space = await spaceService.getById(Number(req.params.id));
  res.json({ status: 'ok', data: space });
});

export const create = asyncHandler(async (req, res) => {
  const space = await spaceService.create(req.body);
  res.status(201).json({ status: 'ok', data: space });
});

export const update = asyncHandler(async (req, res) => {
  const space = await spaceService.update(Number(req.params.id), req.body);
  res.json({ status: 'ok', data: space });
});

export const updateStatus = asyncHandler(async (req, res) => {
  const space = await spaceService.updateStatus(Number(req.params.id), req.body.status);
  res.json({ status: 'ok', data: space });
});

export const deactivate = asyncHandler(async (req, res) => {
  await spaceService.deactivate(Number(req.params.id));
  res.status(204).send();
});
