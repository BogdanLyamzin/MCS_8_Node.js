import * as authServices from "../services/authServices.js";
import { getMovies } from "../services/moviesServices.js";

export const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);
  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
};

export const loginController = async(req, res)=> {
  const result = await authServices.loginUser(req.body);
  res.json(result)
}

export const getCurrentController = async(req, res)=> {
  const {username, email, id: user_id} = req.user;
  const movies = await getMovies({user_id});
  res.json({
    username,
    email,
    movies,
  })
}

export const logoutController = async(req, res)=> {
  await authServices.logoutUser(req.user);
  res.status(204).send();
}