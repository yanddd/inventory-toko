import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createCategory,
  idCategory,
  updateCategory,
} from "../validation/category-validation.js";
import { validate } from "../validation/validation.js";
import { nanoid } from "nanoid";
// import { v4 as uuid } from "uuid";

const create = (request) => {
  const category = validate(createCategory, request);

  category.id = nanoid(10) + category.name_category;

  return prismaClient.category.create({
    data: category,
    select: {
      name_category: true,
    },
  });
};

const get = async () => {
  const category = await prismaClient.category.findMany({
    select: {
      id: true,
      name_category: true,
    },
  });

  if (!category) {
    throw new ResponseError(404, "category is not found");
  }

  return category;
};

const update = async (request) => {
  const category = validate(updateCategory, request);

  const countCategory = await prismaClient.category.count({
    where: {
      id: category.id,
    },
  });

  if (!countCategory) {
    throw new ResponseError(404, "category is not found");
  }

  return prismaClient.category.update({
    where: {
      id: category.id,
    },
    data: {
      name_category: category.name_category,
    },
    select: {
      id: true,
      name_category: true,
    },
  });
};

const remove = async (request) => {
  const cekId = validate(idCategory, request);

  const category = await prismaClient.category.count({
    where: {
      id: cekId,
    },
  });

  if (!category) {
    throw new ResponseError(404, "category is not found");
  }

  const cekItem = await prismaClient.item.count({
    where: {
      category_id: cekId,
    },
  });

  if (cekItem) {
    throw new ResponseError(400, "category is in use");
  }

  return prismaClient.category.delete({
    where: {
      id: cekId,
    },
    select: {
      id: true,
    },
  });
};

export default { create, get, update, remove };
