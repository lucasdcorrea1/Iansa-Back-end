import express from "express";
import { celebrate, Joi } from "celebrate";

import controller from "./subscription.controller";
import authMiddleware from "../../util/auth";

const router = express.Router();

router.get("/subscription", authMiddleware, controller.index);

router.post(
  "/subscription",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email(),
      signup: Joi.boolean().required()
    })
  }),
  controller.create
);

export default router;
