import { celebrate, Joi } from 'celebrate';

export const registerUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
  })
});

export const authenticateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  })
});

export const forgotPassword = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
  })
});

export const resetPassword = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  })
});
