import { nanoid } from "nanoid";
import { prismaClient } from "../app/database.js";
import {
  createHutang,
  createHutangWithId,
  idHutang,
  idKey,
  statusHutang,
  updateHutang,
} from "../validation/hutang-validation.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
  const hutang = validate(createHutang, request);

  hutang.username = user;

  hutang.id_hutang = nanoid(10);

  const newHutang = await prismaClient.hutang.create({
    data: hutang,
    select: {
      id_hutang: true,
      name: true,
      hutang: true,
    },
  });

  return newHutang;
};

const createWithId = async (user, request) => {
  const hutang = validate(createHutangWithId, request);

  const nameHutang = await prismaClient.hutang.findFirst({
    where: {
      id_hutang: hutang.id_hutang,
    },
  });

  if (!nameHutang) {
    throw new ResponseError(404, "Hutang is not found");
  }

  hutang.name = nameHutang.name;

  hutang.username = user;

  const newHutang = await prismaClient.hutang.create({
    data: hutang,
    select: {
      id_hutang: true,
      name: true,
      hutang: true,
    },
  });

  return newHutang;
};

const getAll = async () => {
  const hutang = await prismaClient.hutang.groupBy({
    where: {
      status: "BelumLunas",
    },
    by: ["id_hutang", "name"],
    _sum: {
      hutang: true,
    },
  });

  return hutang;
};

const detail = async (request) => {
  const hutang = validate(idHutang, request);

  const getHutang = await prismaClient.hutang.findMany({
    where: {
      id_hutang: hutang,
    },
  });

  if (getHutang.length === 0) {
    throw new ResponseError(404, "hutang is not found");
  }
  return getHutang;
};

const update = async (user, request) => {
  let hutang;

  if (request.status) {
    hutang = validate(statusHutang, request);

    if (hutang.status === "Lunas") {
      hutang.hutang = 0;
    }
  } else {
    hutang = validate(updateHutang, request);

    hutang.username = user;
    hutang.updated_at = new Date().toISOString();
  }

  const findHutang = await prismaClient.hutang.findUnique({
    where: {
      id: hutang.id,
    },
  });

  if (!findHutang) {
    throw new ResponseError(404, "hutang is not found");
  }

  const updateDataHutang = await prismaClient.hutang.update({
    where: {
      id: hutang.id,
    },
    data: hutang,
    select: {
      id_hutang: true,
      name: true,
      hutang: true,
      status: true,
    },
  });
  return updateDataHutang;
};

const remove = async (request) => {
  const hutang = validate(idKey, request);

  const findHutang = await prismaClient.hutang.findUnique({
    where: {
      id: hutang,
    },
  });

  if (!findHutang) {
    throw new ResponseError(404, "hutang is not found");
  }

  const removeHutang = await prismaClient.hutang.delete({
    where: {
      id: hutang,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return removeHutang;
};

export default { create, createWithId, getAll, detail, update, remove };
