import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";

import { emailRegexp } from "../../constants/authConstants.js";

const User = sequelize.define(
    "user",
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: emailRegexp
            },
            unique: {
                args: true,
                msg: "email already exist"
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }
);

// User.sync({alter: true});

export default User;