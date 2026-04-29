import { Router } from 'express';
import { body, param } from 'express-validator';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import * as spaceController from '../controllers/space.controller.js';

const SPACE_TYPES   = ['classroom', 'laboratory', 'computer_lab', 'multipurpose'];
const SPACE_STATUSES = ['available', 'occupied', 'maintenance'];

const router = Router();

router.use(authenticate);

const idParam = param('id').isInt({ min: 1 }).withMessage('Invalid id');

router.get('/', spaceController.getAll);

router.get('/:id', idParam, validate, spaceController.getById);

router.post(
  '/',
  authorize('admin'),
  [
    body('name').trim().notEmpty().isLength({ max: 100 }),
    body('type').isIn(SPACE_TYPES).withMessage('Invalid type'),
    body('location').trim().notEmpty().isLength({ max: 150 }),
    body('capacity').isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
  ],
  validate,
  spaceController.create
);

router.patch(
  '/:id',
  authorize('admin'),
  [
    idParam,
    body('name').optional().trim().notEmpty().isLength({ max: 100 }),
    body('type').optional().isIn(SPACE_TYPES),
    body('location').optional().trim().notEmpty().isLength({ max: 150 }),
    body('capacity').optional().isInt({ min: 1 }),
    body('isActive').optional().isBoolean(),
  ],
  validate,
  spaceController.update
);

router.patch(
  '/:id/status',
  authorize('admin', 'prefect'),
  [
    idParam,
    body('status').isIn(SPACE_STATUSES).withMessage('Invalid status'),
  ],
  validate,
  spaceController.updateStatus
);

router.delete('/:id', authorize('admin'), idParam, validate, spaceController.deactivate);

export default router;
