const router = require("express").Router();
const multer = require("multer");

const controller = require("./transparency.controller");
const multerConfig = require("../../util/storage/multer");
const authMiddleware = require("../../util/auth/auth");

router.get("/", controller.index);

router.post(
  "/",
  authMiddleware,
  multer(multerConfig).single("file"),
  controller.create
);

router.delete("/delete/:id", authMiddleware, controller.delete);

module.exports = router;
