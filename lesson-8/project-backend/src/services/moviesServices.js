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

// export const getMovieById = id => Movie.findOne({
//     where: {
//         id,
//     }
// })

export const addMovie = (data) => Movie.create(data);

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
