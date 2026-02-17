import Movie from "./models/Movie.js";
import Genre from "./models/Genre.js";

Genre.hasMany(Movie, {foreignKey: "genre_id"});
Movie.belongsTo(Genre, {foreignKey: "genre_id"});