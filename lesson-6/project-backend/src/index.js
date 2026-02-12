import express from "express";
import morgan from "morgan";
import cors from "cors";

import "dotenv/config";

import connectDatabase from "./db/connectDatabase.js";

import moviesRouter from "./routes/moviesRouter.js";
import validationRouter from "./routes/validationRouter.js";
import genresRouter from "./routes/genresRouter.js";

import notFoundHandler from "./middlewares/notFondHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/validation", validationRouter);
app.use("/api/genres", genresRouter);
app.use("/api/movies", moviesRouter);

app.use(notFoundHandler);
app.use(errorHandler);

await connectDatabase();

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
