import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";

const Movie = sequelize.define(
    "movie",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        director: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }
);

// Movie.sync({alter: true});

export default Movie;