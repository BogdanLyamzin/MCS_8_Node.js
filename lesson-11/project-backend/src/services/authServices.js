import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import User from "../db/models/User.js";
import { getMovies } from "../services/moviesServices.js";

import HttpError from "../helpers/HttpError.js";
import sendEmail from "../helpers/sendEmail.js";
import { createToken, verifyToken } from "../helpers/jwtToken.js";

const {BASE_URL} = process.env;

export const findUser = (where) => User.findOne({ where });

const createVerifyEmail = ({to, verificationCode})=> ({
    to,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationCode}" target="_blank">Click verify email</a>`,
})

export const registerUser = async (payload) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);
  const verificationCode = nanoid();
  const newUser = await User.create({
    ...payload,
    password: hashPassword,
    verificationCode,
  });

  const verifyEmail = createVerifyEmail({to: unewUserser.email, verificationCode: newUser.verificationCode});
  await sendEmail(verifyEmail);
  return newUser;
};

export const resendVerify = async ({email})=> {
  const user = await findUser({email});
  if(!user) throw HttpError(404, "User not found");
  if(user.verify) throw HttpError(400, "User already verified");
  const verifyEmail = createVerifyEmail({to: user.email, verificationCode: user.verificationCode});
  await sendEmail(verifyEmail);
}

export const verifyUser = async(verificationCode)=> {
  const user = await findUser({verificationCode});
  if(!user) throw HttpError(404, "User not found");
  return await user.update({verify: true, verificationCode: ""});
}

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "Email or password invalid"); // "Email not found"
  if(!user.verify) throw HttpError(401, "Email not verified");
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password invalid"); // "Password invalid"
  const movies = await getMovies({ user_id: user.id });
  const payload = {
    id: user.id,
  };

  const token = createToken(payload);
  await user.update({ token });
  return { username: user.username, email: user.email, movies, token };
};

export const forgotPassword = async ({email}) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(404, "Email not found");
  const token = createToken({email});
  const resendPasswordEmail = {
    to: user.email,
    subject: "Reset password",
    html: `<a href="http://localhost:5173/auth/new-password?token=${token}" target="_blank">Click reset password email</a>`
  }
  await sendEmail(resendPasswordEmail);
}

export const resetPasword = async({token, password})=> {
  const {data, error} = verifyToken(token);
  if(error) throw HttpError(401, error.message);

  const user = await findUser({email: data.email});
  if(!user) throw HttpError(404, "User not found");

  const hashPassword = await bcrypt.hash(password, 10);
  return await user.update({password: hashPassword});
}

export const logoutUser = (user) => {
  return user.update({ token: null });
};
