import { Joi } from 'celebrate';

export const postSlide = Joi.object()
  .keys({
    file: Joi.any().required(),
    body: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      expirationDate: Joi.date().required()
    })
  })
  .unknown(true);
