import { Router } from "express";
import { body } from "express-validator";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

router.post("/login",authLimiter,
  [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  authController.login,
);

router.get("/me", authenticate, authController.me);

router.post("/logout", authenticate, authController.logout);

export default router;
