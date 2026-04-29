import { createLogger, format, transports } from 'winston';

// OWASP A09 — Security Logging and Monitoring
const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    // Never log sensitive fields
    format((info) => {
      const SENSITIVE = ['password', 'token', 'secret', 'authorization', 'credit_card'];
      SENSITIVE.forEach((key) => {
        if (info[key]) info[key] = '[REDACTED]';
      });
      return info;
    })(),
    process.env.NODE_ENV === 'production'
      ? format.json()
      : format.combine(format.colorize(), format.simple()),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
