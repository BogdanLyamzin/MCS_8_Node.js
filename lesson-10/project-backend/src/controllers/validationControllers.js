import HttpError from "../helpers/HttpError.js";

import * as constants from "../constants/index.js";

export const getValidationController = (req, res)=> {
    res.json(constants);
}

export const getValidationTypeController = (req, res)=> {
    const {type} = req.params;
    const result = constants[type];
    if(!result) throw HttpError(404, `Type ${type} not found`);

    res.json(result);
}