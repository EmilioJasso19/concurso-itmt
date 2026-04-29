import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

// OWASP A01 — Broken Access Control
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ status: "error", message: "No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    logger.warn("Invalid token attempt", { ip: req.ip });
    return res
      .status(401)
      .json({ status: "error", message: "Invalid or expired token." });
  }
}

// OWASP A01 — Role-based access control
function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res
        .status(403)
        .json({ status: "error", message: "Insufficient permissions." });
    }
    next();
  };
}

export { authenticate, authorize };
