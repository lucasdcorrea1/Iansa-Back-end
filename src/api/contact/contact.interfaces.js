const { Segments, Joi } = require("celebrate");

const postContact = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    name: Joi.string(),
    phone: Joi.string()
      .min(10)
      .max(12),
    message: Joi.string().required()
  })
};

module.exports = postContact;
