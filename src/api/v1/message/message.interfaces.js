import { celebrate, Joi } from 'celebrate';

export const postMessage = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    name: Joi.string(),
    phone: Joi.string()
      .min(10)
      .max(12),
    message: Joi.string().required()
  })
});
