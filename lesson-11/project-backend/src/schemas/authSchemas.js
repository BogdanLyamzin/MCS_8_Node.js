import Joi from "joi";

import { emailRegexp } from "../constants/authConstants.js";

export const authRegisterSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

export const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
})

export const authLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

export const resetPasswordSchema = Joi.object({
    password: Joi.string().min(6).required(),
    token: Joi.string().required(),
})