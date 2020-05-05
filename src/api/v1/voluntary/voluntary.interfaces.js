import { celebrate, Joi } from 'celebrate';

export const postVoluntary = celebrate({
  body: Joi.object().keys({
    fullName: Joi.string().required(),
    cpf: Joi.number().required(),
    zipCode: Joi.string().required(),
    address: Joi.string().required(),
    addressNumber: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    birthDate: Joi.date(),
    gender: Joi.string(),
    bloodType: Joi.string(),
    mainActivity: Joi.string(),
    description: Joi.string().required()
  })
});
