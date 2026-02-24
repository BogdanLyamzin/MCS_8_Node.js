import * as fs from "node:fs/promises";

import Movie from "../db/models/Movie.js";
import Genre from "../db/models/Genre.js";

import cloudidnary from "../helpers/cloudinary.js";

const genreInclude = {
  model: Genre,
  attributes: ["name"],
};

export const getMovies = (where) =>
  Movie.findAll({
    where,
    include: [genreInclude],
  });

export const getMovie = (where) =>
  Movie.findOne(
    { where },
    {
      include: [genreInclude],
    }
  );

export const addMovie = async (data, file) => {
  let poster = null;
  if (file) {
    const { secure_url } = await cloudidnary.uploader.upload(file.path, {
      folder: "posters",
      use_filename: true,
    });
    poster = secure_url;
    await fs.unlink(file.path);
  }
  return Movie.create({ ...data, poster });
};

export const updateMovie = async (where, data) => {
  const movie = await getMovie(where);
  if (!movie) return null;
  const oldGenreId = movie.genre_id;
  await movie.update(data);
  if (movie.genre_id !== oldGenreId) {
    await movie.reload({
      include: [genreInclude],
    });
  }
  return movie;
};

export const deleteMovie = async (where) => {
  const movie = await getMovie(where);
  if (!movie) return null;
  await movie.destroy();
  return movie;
};
