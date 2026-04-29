import { Router } from 'express';
import { body, param } from 'express-validator';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import * as userController from '../controllers/user.controller.js';

const router = Router();

router.use(authenticate, authorize('admin'));

const idParam = param('id').isInt({ min: 1 }).withMessage('Invalid id');

router.get('/', userController.getAll);

router.get('/:id', idParam, validate, userController.getById);

router.post(
  '/',
  [
    body('name').trim().notEmpty().isLength({ max: 100 }),
    body('username').trim().notEmpty().isLength({ max: 50 }),
    body('password').isLength({ min: 8, max: 72 }).withMessage('Password must be 8–72 characters'),
    body('role').isIn(['admin', 'academic', 'prefect']).withMessage('Invalid role'),
  ],
  validate,
  userController.create
);

router.patch(
  '/:id',
  [
    idParam,
    body('name').optional().trim().notEmpty().isLength({ max: 100 }),
    body('username').optional().trim().notEmpty().isLength({ max: 50 }),
    body('password').optional().isLength({ min: 8, max: 72 }),
    body('role').optional().isIn(['admin', 'academic', 'prefect']),
    body('isActive').optional().isBoolean(),
  ],
  validate,
  userController.update
);

router.delete('/:id', idParam, validate, userController.deactivate);

export default router;
