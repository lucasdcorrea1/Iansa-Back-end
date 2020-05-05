import { celebrate, Joi } from 'celebrate';

export const postVoluntary = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    active: Joi.boolean().default(true)
  })
});
