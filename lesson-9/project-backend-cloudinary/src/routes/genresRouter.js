import { Router } from "express";

import {
  getGenresController,
  getGenreByIdController,
  addGenreController,
} from "../controllers/genresControllers.js";

import validateBody from "../helpers/validateBody.js";

import { genreAddSchema } from "../schemas/genresSchemas.js";

const genresRouter = Router();

genresRouter.get("/", getGenresController);

genresRouter.get("/:id", getGenreByIdController);

genresRouter.post("/", validateBody(genreAddSchema), addGenreController);

export default genresRouter;
