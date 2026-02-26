import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";
import Genre from "./Genre.js";

import { minReleaseYear, categoryList } from "../../constants/movieConstants.js";

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
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "movie",
            validate: {
                isIn: {
                    args: [categoryList],
                    msg: `category must be from ${categoryList.join(", ")}`
                }
            }
        },
        releaseYear: {
            type: DataTypes.INTEGER,
            validate: {
                min: {
                    args: minReleaseYear,
                    msg: `Release year must be ${minReleaseYear} or greater`
                }
            }
        },
        genre_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "genres",
                key: "id"
            },
            onDelete: "RESTRICT",
            onUpdate: "CASCADE"
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        poster: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }
);

// Movie.sync({alter: true});

export default Movie;