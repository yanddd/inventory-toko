import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  getUserValidation,
  loginValidation,
  registerValidation,
  updateValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
  const user = validate(registerValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Username sudah ada");
  }

  user.password = await bcrypt.hash(user.password, 10);

  delete user.confirmPassword;

  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      fullname: true,
    },
  });
};

const login = async (request) => {
  const loginReq = validate(loginValidation, request);

  const checkUser = await prismaClient.user.findUnique({
    where: {
      username: loginReq.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!checkUser) {
    throw new ResponseError(401, "Username atau password salah");
  }

  const passwordValid = await bcrypt.compare(
    loginReq.password,
    checkUser.password
  );

  if (!passwordValid) {
    throw new ResponseError(401, "Username atau password salah");
  }

  const token = uuid().toString();

  return prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      username: checkUser.username,
    },
    select: {
      token: true,
    },
  });
};

const getUser = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      fullname: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user tidak ditemukan");
  }

  return user;
};

const update = async (username, request) => {
  username = validate(getUserValidation, username);
  const reqUser = validate(updateValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User tidak ditemukan");
  }

  delete reqUser.confirmPassword;

  if (reqUser.password) {
    reqUser.password = await bcrypt.hash(reqUser.password, 10);
  }

  reqUser.updated_at = new Date().toISOString();

  return prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: reqUser,
    select: {
      username: true,
      fullname: true,
    },
  });
};
const logout = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user tidak ditemukan");
  }

  await prismaClient.user.update({
    where: {
      username: username,
    },
    data: {
      token: null,
    },
  });
};

export default { register, login, getUser, logout, update };
