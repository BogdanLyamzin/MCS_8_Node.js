import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

import User from "../db/models/User.js";
import { getMovies } from "../services/moviesServices.js";

import HttpError from "../helpers/HttpError.js";

import { createToken } from "../helpers/jwtToken.js";

// const {JWT_SECRET} = process.env;

export const findUser = (where) => User.findOne({ where });

export const registerUser = async (payload) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);
  return User.create({ ...payload, password: hashPassword });
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "Email or password invalid"); // "Email not found"

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password invalid"); // "Password invalid"
  const movies = await getMovies({ user_id: user.id });
  const payload = {
    id: user.id,
  };

  const token = createToken(payload);
  await user.update({token});
  return { username: user.username, email: user.email, movies, token };
};

export const logoutUser = user => {
    return user.update({token: null});
}