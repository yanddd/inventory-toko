import joi from "joi";

const createItem = joi.object({
  name_item: joi.string().max(100).required(),
  modal: joi.number().max(999999).required(),
  price: joi.number().max(999999).required(),
  brand: joi.string().max(100).required(),
  stock: joi.number().max(999).required(),
  category_id: joi.string().max(100).required(),
});

export { createItem };
