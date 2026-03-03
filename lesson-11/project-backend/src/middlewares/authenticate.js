// import jwt from "jsonwebtoken";

// import User from "../db/models/User.js";

import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwtToken.js";

import { findUser } from "../services/authServices.js";

// const {JWT_SECRET} = process.env;

const authenticate = async(req, res, next)=> {
    // const {authorization} = req.headers;
    const authorization = req.get("Authorization");
    if(!authorization) throw HttpError(401, "Authorization header missing");
    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer") throw HttpError(401, "Authorization header msy have Bearer type");

    const {data, error} = verifyToken(token);
    if(error) throw HttpError(401, error.message);
    // const user = await User.findOne({
    //     where: {
    //         id: data.id
    //     }
    // });
    const user = await findUser({id: data.id});
    if(!user || !user.token) throw HttpError(401, "User not found");
    req.user = user;
    next();
    // try {
    //     jwt.verify(token, JWT_SECRET);
    // }
    // catch(error) {
    //     throw HttpError(401, error.message);
    // }
}

export default authenticate;