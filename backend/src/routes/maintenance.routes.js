import { Router } from 'express';
import { body, param } from 'express-validator';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import * as maintenanceController from '../controllers/maintenance.controller.js';

const PRIORITIES = ['low', 'medium', 'high', 'urgent'];
const STATUSES   = ['open', 'in_progress', 'closed', 'cancelled'];

const router = Router();

router.use(authenticate);

const idParam    = param('id').isInt({ min: 1 }).withMessage('Invalid id');
const spaceParam = param('spaceId').isInt({ min: 1 }).withMessage('Invalid spaceId');

router.get('/', maintenanceController.getAll);
router.get('/space/:spaceId', spaceParam, validate, maintenanceController.getBySpace);
router.get('/:id', idParam, validate, maintenanceController.getById);

router.post(
  '/',
  authorize('admin', 'prefect'),
  [
    body('spaceId').isInt({ min: 1 }).withMessage('spaceId must be a positive integer'),
    body('failureType').trim().notEmpty().isLength({ max: 100 }),
    body('priority').isIn(PRIORITIES).withMessage('Invalid priority'),
    body('description').trim().notEmpty(),
    body('startDate').isDate().withMessage('startDate must be a valid date (YYYY-MM-DD)'),
    body('assignedTo').optional().isInt({ min: 1 }),
  ],
  validate,
  maintenanceController.create
);

router.patch(
  '/:id',
  authorize('admin', 'prefect'),
  [
    idParam,
    body('failureType').optional().trim().notEmpty().isLength({ max: 100 }),
    body('priority').optional().isIn(PRIORITIES),
    body('description').optional().trim().notEmpty(),
    body('progress').optional().trim(),
    body('notes').optional().trim(),
    body('startDate').optional().isDate(),
    body('endDate').optional().isDate(),
    body('assignedTo').optional().isInt({ min: 1 }),
    body('status').optional().isIn(STATUSES),
  ],
  validate,
  maintenanceController.update
);

export default router;
