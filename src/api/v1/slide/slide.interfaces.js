import { celebrate, Joi } from 'celebrate';

export const postSlide = celebrate({
  body: Joi.object().keys({
    expirationDate: Joi.date().required(),
    title: Joi.string().required(),
    description: Joi.string(),
    name: Joi.string(),
    size: Joi.number(),
    key: Joi.string(),
    url: Joi.string()
  })
});

export const deleteSlide = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
  })
});
