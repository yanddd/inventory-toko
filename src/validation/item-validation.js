import joi from "joi";

const createItem = joi.object({
  name_item: joi.string().max(100).required(),
  modal: joi.number().max(999999),
  modal_pack: joi.number().max(9999999),
  price: joi.number().max(999999),
  brand: joi.string().max(100),
  stock: joi.number().max(999),
  category_id: joi.string().max(100).required(),
});

const updateItem = joi.object({
  id: joi.string().max(100).required(),
  name_item: joi.string().max(100).required(),
  modal: joi.number().max(999999),
  modal_pack: joi.number().max(9999999),
  price: joi.number().max(999999),
  brand: joi.string().max(100),
  stock: joi.number().max(999),
  category_id: joi.string().max(100).required(),
});

const idItem = joi.string().max(100).required();

export { createItem, updateItem, idItem };
