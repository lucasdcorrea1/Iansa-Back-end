const router = require("express").Router();
const { celebrate, Segments, Joi } = require("celebrate");

const controller = require("./contact-controller");
const authMiddleware = require("../../middlewares/auth");

router.get("/", authMiddleware, controller.index);

router.post(
  "/",
  celebrate({
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
  }),
  controller.create
);

module.exports = router;
