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

const idKey = joi.number().positive().required();

const idHutang = joi.string().required();

const updateHutang = joi.object({
  id: joi.number().positive().required(),
  hutang: joi.number().required(),
  note: joi.string().required(),
});

const statusHutang = joi.object({
  id: joi.number().positive().required(),
  status: joi.string().valid("BelumLunas", "Lunas"),
});

export {
  createHutang,
  createHutangWithId,
  idKey,
  idHutang,
  updateHutang,
  statusHutang,
};
