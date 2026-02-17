import Joi from "joi";

import { minReleaseYear, categoryList } from "../constants/movieConstants.js";

export const movieAddSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "movie title must be exist",
        "string.base": "movie title must be string"
    }),
    director: Joi.string().required(),
    favorite: Joi.boolean(),
    category: Joi.string().valid(...categoryList),
    releaseYear: Joi.number().min(minReleaseYear),
    genre_id: Joi.number().required(),
})

export const movieUpdateSchema = Joi.object({
    title: Joi.string(),
    director: Joi.string(),
    favorite: Joi.boolean(),
    category: Joi.string().valid(...categoryList),
    releaseYear: Joi.string().min(minReleaseYear), 
    genre_id: Joi.number()
}).min(1)