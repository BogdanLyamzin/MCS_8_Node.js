import * as fs from "node:fs/promises";
import * as path from "node:path";

import Movie from "../db/models/Movie.js";
import Genre from "../db/models/Genre.js";

const genreInclude = {
  model: Genre,
  attributes: ["name"],
};

export const getMovies = where =>
  Movie.findAll({
    where,
    include: [genreInclude],
  });

export const getMovie = where =>
  Movie.findOne({where}, {
    include: [genreInclude],
  });

export const addMovie = async (data, file) => {
  let poster = null;
  if(file) {
    const newPath = path.resolve("public", "posters", file.filename);
    await fs.rename(file.path, newPath);
    poster = path.join("posters", file.filename);
  }
  return Movie.create({...data, poster});
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

export const deleteMovie = async where => {
  const movie = await getMovie(where);
  if (!movie) return null;
  await movie.destroy();
  return movie;
};
