import Joi from "joi";

export const createBlogContract = Joi.object({
  title: Joi.string().required(),
  subtitle: Joi.string().required(),
  content: Joi.string().required(),
  image: Joi.string().required(),
  userId: Joi.string().length(24).hex().required(),
});

export const updateBlogContract = Joi.object({
  title: Joi.string().optional(),
  subtitle: Joi.string().optional(),
  content: Joi.string().optional(),
  image: Joi.string().optional(),
  userId: Joi.string().length(24).hex().optional(),
});
