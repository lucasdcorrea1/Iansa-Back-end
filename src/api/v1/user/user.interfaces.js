import { celebrate, Joi } from 'celebrate';

export const singUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
  })
});

export const login = celebrate({
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
