import * as moviesServices from "../services/moviesServices.js";

import HttpError from "../helpers/HttpError.js";

export const getMoviesController = async(req, res)=> {
    const {id: user_id} = req.user;
    const movies = await moviesServices.getMovies({user_id});
    res.json(movies);
}

export const getMovieByIdController = async(req, res)=> {
    const {id: user_id} = req.user;
    const {id} = req.params;
    const result = await moviesServices.getMovie({id, user_id});
    if(!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }
    res.json(result);
}

export const addMovieController = async(req, res)=> {
    const {id: user_id} = req.user;
    const result = await moviesServices.addMovie({...req.body, user_id});
    res.status(201).json(result);
}

export const updateMovieByIdController = async(req, res)=> {
    const {id} = req.params;
    const {id: user_id} = req.user;
    const result = await moviesServices.updateMovie({id, user_id}, req.body);
    if(!result) throw HttpError(404, `Movie with id=${id} not found`);
    res.json(result);
}

export const deleteMovieByIdController = async(req, res)=> {
    const {id} = req.params;
    const {id: user_id} = req.user;
    const result = await moviesServices.deleteMovie({id, user_id});
    if(!result) throw HttpError(404, `Movie with id=${id} not found`);
    // res.status(204).send();
    res.json({
        message: "Delete successfully"
    })
}