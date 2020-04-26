import { Joi } from "celebrate";

export const authSchema = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string(),
    token: Joi.string()
  })
};
