import { Router } from 'express';
import authRoutes        from './auth.routes.js';
import userRoutes        from './user.routes.js';
import spaceRoutes       from './space.routes.js';
import scheduleRoutes    from './schedule.routes.js';
import incidentRoutes    from './incident.routes.js';
import maintenanceRoutes from './maintenance.routes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/auth',        authRoutes);
router.use('/users',       userRoutes);
router.use('/spaces',      spaceRoutes);
router.use('/schedules',   scheduleRoutes);
router.use('/incidents',   incidentRoutes);
router.use('/maintenance', maintenanceRoutes);

export default router;
