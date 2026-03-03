import { Router } from "express";

import {
  registerController,
  resendVerifyController,
  verifyController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
  getCurrentController,
  logoutController,
} from "../controllers/authControllers.js";

import authenticate from "../middlewares/authenticate.js";

import validateBody from "../helpers/validateBody.js";

import { authRegisterSchema, emailSchema, authLoginSchema, resetPasswordSchema } from "../schemas/authSchemas.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  registerController
);

authRouter.get("/verify/:verificationCode", verifyController);

authRouter.post("/verify/resend", validateBody(emailSchema), resendVerifyController);

authRouter.post("/login", validateBody(authLoginSchema), loginController);

authRouter.post("/password/forgot", validateBody(emailSchema), forgotPasswordController);

authRouter.post("/password/reset", validateBody(resetPasswordSchema), resetPasswordController);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.post("/logout", authenticate, logoutController);

export default authRouter;
