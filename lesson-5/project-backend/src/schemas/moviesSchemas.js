import Joi from "joi";

export const movieAddSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "movie title must be exist",
        "string.base": "movie title must be string"
    }),
    director: Joi.string().required(),
})

export const movieUpdateSchema = Joi.object({
    title: Joi.string(),
    director: Joi.string(),
}).min(1)