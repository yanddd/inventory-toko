import joi from "joi";

const createCategory = joi.object({
  name_category: joi.string().max(100).required(),
});

const idCategory = joi.string().max(100).required();

const updateCategory = joi.object({
  id: joi.string().max(100).required(),
  name_category: joi.string().max(100).required(),
});

export { createCategory, idCategory, updateCategory };
