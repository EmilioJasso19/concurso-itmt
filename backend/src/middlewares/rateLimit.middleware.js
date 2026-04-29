import rateLimit from 'express-rate-limit';

// OWASP A07 — Identification and Authentication Failures
const generalLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000000000000,
  max: Number(process.env.RATE_LIMIT_MAX) || 10000000000000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'error', message: 'Too many requests, please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'error', message: 'Too many login attempts, please try again later.' },
});

export { generalLimiter, authLimiter };
