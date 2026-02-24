import Movie from "./models/Movie.js";
import Genre from "./models/Genre.js";
import User from "./models/User.js";

Genre.hasMany(Movie, {foreignKey: "genre_id"});
Movie.belongsTo(Genre, {foreignKey: "genre_id"});
User.hasMany(Movie, {foreignKey: "user_id"});
Movie.belongsTo(User, {foreignKey: "user_id"});