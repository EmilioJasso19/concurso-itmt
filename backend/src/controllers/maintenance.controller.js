import * as maintenanceService from '../services/maintenance.service.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getAll = asyncHandler(async (_req, res) => {
  const records = await maintenanceService.getAll();
  res.json({ status: 'ok', data: records });
});

export const getById = asyncHandler(async (req, res) => {
  const record = await maintenanceService.getById(Number(req.params.id));
  res.json({ status: 'ok', data: record });
});

export const getBySpace = asyncHandler(async (req, res) => {
  const records = await maintenanceService.getBySpace(Number(req.params.spaceId));
  res.json({ status: 'ok', data: records });
});

export const create = asyncHandler(async (req, res) => {
  const record = await maintenanceService.create(req.body, req.user.id);
  res.status(201).json({ status: 'ok', data: record });
});

export const update = asyncHandler(async (req, res) => {
  const record = await maintenanceService.update(Number(req.params.id), req.body, req.user.id);
  res.json({ status: 'ok', data: record });
});
