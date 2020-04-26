import express from "express";
import { celebrate } from "celebrate";

import * as Validator from "../auth/auth.interfaces";
import AuthController from "../auth/auth.controller";
import UserController from "./user.controller";
import Auth from "../../util/auth/auth";

const router = express.Router();

router.post(
  "/user/auth",
  celebrate(Validator.authSchema),
  AuthController.authenticate
);

router.post(
  "/user/forgotpassword",
  celebrate(Validator.authSchema),
  AuthController.forgotPassword
);

router.put(
  "/user/resetpassword",
  Auth,
  celebrate(Validator.authSchema),
  AuthController.resetPassword
);

router.post(
  "/user/register",
  celebrate(Validator.authSchema),
  Auth,
  UserController.create
);

export default router;
