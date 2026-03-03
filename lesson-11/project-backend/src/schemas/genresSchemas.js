import Joi from "joi";

export const genreAddSchema = Joi.object({
    name: Joi.string().required(),
})