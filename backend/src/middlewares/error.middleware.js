import logger from '../utils/logger.js';

function notFound(req, res) {
  res.status(404).json({ status: 'error', message: `Route ${req.originalUrl} not found.` });
}

// OWASP A09 — log errors; never expose stack traces to the client
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  logger.error(err.message, {
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  res.status(statusCode).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'Internal server error.'
      : err.message,
  });
}

export { notFound, errorHandler };
