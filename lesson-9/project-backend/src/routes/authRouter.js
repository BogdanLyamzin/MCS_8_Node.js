import { Router } from "express";

import {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
} from "../controllers/authControllers.js";

import authenticate from "../middlewares/authenticate.js";

import validateBody from "../helpers/validateBody.js";

import { authRegisterSchema, authLoginSchema } from "../schemas/authSchemas.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  registerController
);

authRouter.post("/login", validateBody(authLoginSchema), loginController);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.post("/logout", authenticate, logoutController);

export default authRouter;
