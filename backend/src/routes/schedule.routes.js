import { Router } from 'express';
import { body, param } from 'express-validator';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import * as scheduleController from '../controllers/schedule.controller.js';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const TIME_RE = /^\d{2}:\d{2}$/;

const router = Router();

router.use(authenticate);

const idParam     = param('id').isInt({ min: 1 }).withMessage('Invalid id');
const spaceParam   = param('spaceId').isInt({ min: 1 }).withMessage('Invalid spaceId');
const teacherParam = param('teacherId').isInt({ min: 1 }).withMessage('Invalid teacherId');

router.get('/', scheduleController.getAll);
router.get('/space/:spaceId',     spaceParam,   validate, scheduleController.getBySpace);
router.get('/teacher/:teacherId', authorize('admin', 'academic'), teacherParam, validate, scheduleController.getByTeacher);
router.get('/:id', idParam, validate, scheduleController.getById);

router.post(
  '/',
  authorize('admin', 'academic'),
  [
    body('program').trim().notEmpty().isLength({ max: 100 }),
    body('subject').trim().notEmpty().isLength({ max: 100 }),
    body('teacherId').isInt({ min: 1 }).withMessage('teacherId must be a positive integer'),
    body('groupName').trim().notEmpty().isLength({ max: 20 }),
    body('day').isIn(DAYS).withMessage('Invalid day'),
    body('startTime').matches(TIME_RE).withMessage('startTime must be HH:MM'),
    body('endTime').matches(TIME_RE).withMessage('endTime must be HH:MM'),
    body('spaceId').isInt({ min: 1 }).withMessage('spaceId must be a positive integer'),
  ],
  validate,
  scheduleController.create
);

router.patch(
  '/:id',
  authorize('admin', 'academic'),
  [
    idParam,
    body('program').optional().trim().notEmpty().isLength({ max: 100 }),
    body('subject').optional().trim().notEmpty().isLength({ max: 100 }),
    body('teacherId').optional().isInt({ min: 1 }),
    body('groupName').optional().trim().notEmpty().isLength({ max: 20 }),
    body('day').optional().isIn(DAYS),
    body('startTime').optional().matches(TIME_RE),
    body('endTime').optional().matches(TIME_RE),
    body('spaceId').optional().isInt({ min: 1 }),
  ],
  validate,
  scheduleController.update
);

router.delete('/:id', authorize('admin'), idParam, validate, scheduleController.deactivate);

export default router;
