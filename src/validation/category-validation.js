import joi from "joi";

const createCategory = joi.object({
  name_category: joi.string().required(),
});

export { createCategory };
