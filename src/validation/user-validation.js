import joi from "joi";

const registerValidation = joi.object({
  username: joi.string().max(100).required(),
  fullname: joi.string().max(100).required(),
  password: joi.string().max(100).required(),
  confirmPassword: joi
    .any()
    .valid(joi.ref("password"))
    .required()
    .messages({ "any.only": "{{#label}} does not match" }),
});

const loginValidation = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

const getUserValidation = joi.string().required();

const updateValidation = joi.object({
  username: joi.string().max(100).optional(),
  fullname: joi.string().max(100).optional(),
  password: joi.string().max(100).optional(),
  confirmPassword: joi
    .any()
    .valid(joi.ref("password"))
    .optional()
    .messages({ "any.only": "{{#label}} does not match" }),
});

export {
  registerValidation,
  loginValidation,
  getUserValidation,
  updateValidation,
};
