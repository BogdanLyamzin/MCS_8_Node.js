import Movie from "../db/models/Movie.js";

export const getMovies = () => Movie.findAll(); // SELECT * FROM movies;

export const getMovieById = (id) => Movie.findByPk(id);

// export const getMovieById = id => Movie.findOne({
//     where: {
//         id,
//     }
// })

export const addMovie = (data) => Movie.create(data);

export const updateMovieById = async (id, data) => {
  const movie = await getMovieById(id);
  if (!movie) return null;
  await movie.update(data);
  return movie;
};

export const deleteMovieById = async (id) => {
  const movie = await getMovieById(id);
  if (!movie) return null;
  await movie.destroy();
  return movie;
};
