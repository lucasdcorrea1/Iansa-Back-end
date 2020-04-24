const router = require("express").Router();
const { celebrate } = require("celebrate");

const authSchema = require("../auth/auth-schema");
const authController = require("../auth/auth-controller");
const userController = require("./user.controller");
const authMiddleware = require("../../util/auth/auth");

router.post("/auth", celebrate(authSchema), authController.authenticate);

router.post(
  "/forgotpassword",
  celebrate(authSchema),
  authController.forgotPassword
);

router.put(
  "/resetpassword",
  authMiddleware,
  celebrate(authSchema),
  authController.resetPassword
);

router.post(
  "/register",
  celebrate(authSchema),
  authMiddleware,
  userController.create
);

module.exports = router;
