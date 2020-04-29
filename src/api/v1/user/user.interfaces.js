import { celebrate, Joi } from "celebrate";

export const registerUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string()
  })
});

export const authenticateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string()
  })
});

export const forgotPassword = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email()
  })
});

export const resetPassword = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string()
  })
});
