import Joi from "joi";

export const userRegisterContract = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("user", "admin").optional(),
});
export const userLoginContract = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
