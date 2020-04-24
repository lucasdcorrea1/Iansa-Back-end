const { Segments, Joi } = require("celebrate");

const authSchema = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string(),
    token: Joi.string()
  })
};

module.exports = authSchema;
