import * as incidentService from '../services/incident.service.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getAll = asyncHandler(async (_req, res) => {
  const incidents = await incidentService.getAll();
  res.json({ status: 'ok', data: incidents });
});

export const getById = asyncHandler(async (req, res) => {
  const incident = await incidentService.getById(Number(req.params.id));
  res.json({ status: 'ok', data: incident });
});

export const getBySpace = asyncHandler(async (req, res) => {
  const incidents = await incidentService.getBySpace(Number(req.params.spaceId));
  res.json({ status: 'ok', data: incidents });
});

export const create = asyncHandler(async (req, res) => {
  const incident = await incidentService.create(req.body, req.user.id);
  res.status(201).json({ status: 'ok', data: incident });
});

export const update = asyncHandler(async (req, res) => {
  const incident = await incidentService.update(Number(req.params.id), req.body, req.user.id);
  res.json({ status: 'ok', data: incident });
});
