import { Router } from 'express';
import { body, param } from 'express-validator';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import * as incidentController from '../controllers/incident.controller.js';

const INCIDENT_TYPES   = ['teacher_absence', 'equipment_failure', 'infrastructure_failure', 'other'];
const INCIDENT_STATUSES = ['open', 'in_progress', 'closed', 'cancelled'];

const router = Router();

router.use(authenticate);

const idParam    = param('id').isInt({ min: 1 }).withMessage('Invalid id');
const spaceParam = param('spaceId').isInt({ min: 1 }).withMessage('Invalid spaceId');

router.get('/', incidentController.getAll);
router.get('/space/:spaceId', spaceParam, validate, incidentController.getBySpace);
router.get('/:id', idParam, validate, incidentController.getById);

router.post(
  '/',
  [
    body('type').isIn(INCIDENT_TYPES).withMessage('Invalid incident type'),
    body('spaceId').isInt({ min: 1 }).withMessage('spaceId must be a positive integer'),
    body('date').isDate().withMessage('date must be a valid date (YYYY-MM-DD)'),
    body('description').trim().notEmpty(),
  ],
  validate,
  incidentController.create
);

router.patch(
  '/:id',
  authorize('admin', 'prefect'),
  [
    idParam,
    body('type').optional().isIn(INCIDENT_TYPES),
    body('spaceId').optional().isInt({ min: 1 }),
    body('date').optional().isDate(),
    body('description').optional().trim().notEmpty(),
    body('status').optional().isIn(INCIDENT_STATUSES),
  ],
  validate,
  incidentController.update
);

export default router;
