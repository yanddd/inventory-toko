import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { createCategory } from "../validation/category-validation.js";
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

export default { create, get };
