import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount feature routers here:
// router.use('/auth', (await import('./auth.routes.js')).default);
// router.use('/users', (await import('./user.routes.js')).default);

export default router;
