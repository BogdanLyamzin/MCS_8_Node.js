import { Router } from "express";

import {
  registerController,
  loginController,
} from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js";

import { authRegisterSchema, authLoginSchema } from "../schemas/authSchemas.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  registerController
);

authRouter.post("/login", validateBody(authLoginSchema), loginController);

export default authRouter;
