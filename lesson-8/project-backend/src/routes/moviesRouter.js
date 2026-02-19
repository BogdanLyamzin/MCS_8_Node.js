import { Router } from "express";

import {
  getMoviesController,
  getMovieByIdController,
  addMovieController,
  updateMovieByIdController,
  deleteMovieByIdController,
} from "../controllers/moviesControllers.js";

import authenticate from "../middlewares/authenticate.js";

import validateBody from "../helpers/validateBody.js";

import {movieAddSchema, movieUpdateSchema} from "../schemas/moviesSchemas.js";

const moviesRouter = Router();

moviesRouter.use(authenticate);

moviesRouter.get("/", getMoviesController);

moviesRouter.get("/:id", getMovieByIdController);

moviesRouter.post("/", validateBody(movieAddSchema), addMovieController);

moviesRouter.put("/:id", validateBody(movieUpdateSchema), updateMovieByIdController);

moviesRouter.delete("/:id", deleteMovieByIdController);

export default moviesRouter;
