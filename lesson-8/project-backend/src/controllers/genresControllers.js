import * as genresServices from "../services/genresServices.js";

import HttpError from "../helpers/HttpError.js";

export const getGenresController = async(req, res)=> {
    const result = await genresServices.getGenres();
    res.json(result);
}

export const getGenreByIdController = async(req, res)=> {
    const {id} = req.params;
    const result = await genresServices.getGenreById(id);
    if(!result) throw HttpError(404, `Genre with id=${id} not found`);

    res.json(result);
}

export const addGenreController = async(req, res)=> {
    const result = await genresServices.addGenre(req.body);
    res.status(201).json(result);
}