import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";

const Genre = sequelize.define(
    "genre",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);

// Genre.sync();

export default Genre;