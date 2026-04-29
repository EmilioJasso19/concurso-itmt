import 'dotenv/config';
import app from './src/app.js';
import logger from './src/utils/logger.js';
import { validateEnv } from './src/config/env.js';
import Database from './src/config/database.js';

validateEnv();

try {
  await Database.getInstance().query('SELECT 1');
  logger.info('Database connection verified');
} catch (err) {
  logger.error('Database unreachable at startup', { message: err.message });
  process.exit(1);
}

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} [${process.env.NODE_ENV}]`);
});

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled rejection:', err);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception:', err);
  process.exit(1);
});
