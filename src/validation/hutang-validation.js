import joi from "joi";

const createHutang = joi.object({
  name: joi.string().max(100).required(),
  hutang: joi.number().required(),
  note: joi.string().required(),
});

const createHutangWithId = joi.object({
  id_hutang: joi.string().required(),
  hutang: joi.number().required(),
  note: joi.string().required(),
});

const idHutang = joi.string().required();

const updateHutang = joi.object({
  id: joi.number().positive().required(),
  hutang: joi.number().required(),
  note: joi.string().required(),
});

export { createHutang, createHutangWithId, idHutang, updateHutang };
