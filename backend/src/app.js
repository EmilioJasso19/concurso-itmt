import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import { generalLimiter } from './middlewares/rateLimit.middleware.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';
import routes from './routes/index.js';

const app = express();

// OWASP A05 — Security Misconfiguration: secure HTTP headers
app.use(helmet());

// OWASP A05 — restrict origins
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// OWASP A03 — HTTP Parameter Pollution prevention
app.use(hpp());

// Body parsers with size limits (OWASP A04)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// OWASP A07 — general rate limiting
app.use('/api', generalLimiter);

// Routes
app.use('/api', routes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
