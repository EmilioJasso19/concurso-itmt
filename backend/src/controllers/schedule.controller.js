import * as scheduleService from '../services/schedule.service.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getAll = asyncHandler(async (_req, res) => {
  const schedules = await scheduleService.getAll();
  res.json({ status: 'ok', data: schedules });
});

export const getById = asyncHandler(async (req, res) => {
  const schedule = await scheduleService.getById(Number(req.params.id));
  res.json({ status: 'ok', data: schedule });
});

export const getBySpace = asyncHandler(async (req, res) => {
  const schedules = await scheduleService.getBySpace(Number(req.params.spaceId));
  res.json({ status: 'ok', data: schedules });
});

export const getByTeacher = asyncHandler(async (req, res) => {
  const schedules = await scheduleService.getByTeacher(Number(req.params.teacherId));
  res.json({ status: 'ok', data: schedules });
});

export const create = asyncHandler(async (req, res) => {
  const schedule = await scheduleService.create({ ...req.body, createdBy: req.user.id });
  res.status(201).json({ status: 'ok', data: schedule });
});

export const update = asyncHandler(async (req, res) => {
  const schedule = await scheduleService.update(Number(req.params.id), req.body);
  res.json({ status: 'ok', data: schedule });
});

export const deactivate = asyncHandler(async (req, res) => {
  await scheduleService.deactivate(Number(req.params.id));
  res.status(204).send();
});
