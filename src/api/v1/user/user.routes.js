import express from "express";

import * as userInterfaces from "./user.interfaces";
import userController from "./user.controller";
import AuthenticateMiddleware from "../../util/auth";

const router = express.Router();
router.post(
  "/user/register",
  userInterfaces.registerUser,
  userController.registerUser
);

router.post(
  "/user/auth",
  userInterfaces.authenticateUser,
  userController.authenticateUser
);

router.post(
  "/user/forgotpassword",
  userInterfaces.forgotPassword,
  userController.forgotPassword
);

router.put(
  "/user/resetpassword",
  AuthenticateMiddleware,
  userInterfaces.resetPassword,
  userController.resetPassword
);

export default router;
