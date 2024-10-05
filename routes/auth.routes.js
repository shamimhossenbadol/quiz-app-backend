import { authControllers } from "../controllers/auth.controllers.js";
import { Router } from "express";
import validateRequest from "../middleware/validateRequest.js";
import { authValidators } from "../validators/auth.validators.js";
import auth from "../middleware/auth.js";

const authRouter = Router();

authRouter
  .route("/sign-up")
  .post(validateRequest(authValidators.signUp), authControllers.signUp);
authRouter
  .route("/login")
  .post(validateRequest(authValidators.login), authControllers.login);
authRouter
  .route("/request-otp")
  .post(
    auth("ADMIN", "USER"),
    validateRequest(authValidators.requestOtp),
    authControllers.requestOtp,
  );
authRouter
  .route("/reset-password")
  .post(
    auth("ADMIN", "USER"),
    validateRequest(authValidators.resetPassword),
    authControllers.resetPassword,
  );

export default authRouter;
