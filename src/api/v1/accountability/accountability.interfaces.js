import { Joi } from 'celebrate';

export const postAccountability = Joi.object()
  .keys({
    file: Joi.any().required(),
    body: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      periodStart: Joi.date().required(),
      periodEnd: Joi.date().required()
    })
  })
  .unknown(true);
