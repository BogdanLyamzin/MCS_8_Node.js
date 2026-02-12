import Genre from "../db/models/Genre.js";
import Movie from "../db/models/Movie.js";

const moviesInclude = {
    model: Movie,
    attributes: ["id", "title", "director", "releaseYear"]
}

export const getGenres = ()=> Genre.findAll({
    include: [moviesInclude]
});

export const getGenreById = id => Genre.findByPk(id, {
    include: [moviesInclude]
});

export const addGenre = data => Genre.create(data);