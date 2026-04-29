import { validationResult } from 'express-validator';

// OWASP A03 — Input validation; use with express-validator chains on routes
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ status: 'error', errors: errors.array() });
  }
  next();
}

export { validate };
