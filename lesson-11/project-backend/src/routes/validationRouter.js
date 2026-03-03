import { Router } from "express";

import { getValidationController, getValidationTypeController } from "../controllers/validationControllers.js";

const validationRouter = Router();

validationRouter.get("/", getValidationController);

validationRouter.get("/:type", getValidationTypeController);

export default validationRouter;