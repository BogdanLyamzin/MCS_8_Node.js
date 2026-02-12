import Movie from "../db/models/Movie.js";
import Genre from "../db/models/Genre.js";

const genreInclude = {
  model: Genre,
  attributes: ["name"],
};

export const getMovies = () =>
  Movie.findAll({
    include: [genreInclude],
  });

export const getMovieById = (id) =>
  Movie.findByPk(id, {
    include: [genreInclude],
  });

// export const getMovieById = id => Movie.findOne({
//     where: {
//         id,
//     }
// })

export const addMovie = (data) => Movie.create(data);

export const updateMovieById = async (id, data) => {
  const movie = await getMovieById(id);
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

export const deleteMovieById = async (id) => {
  const movie = await getMovieById(id);
  if (!movie) return null;
  await movie.destroy();
  return movie;
};
