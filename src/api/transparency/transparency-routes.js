const router = require("express").Router();
const multer = require("multer");

const controller = require("./transparency-controller");
const multerConfig = require("../../middlewares/multer");
const authMiddleware = require("../../middlewares/auth");

router.get("/", controller.index);

router.post(
  "/",
  authMiddleware,
  multer(multerConfig).single("file"),
  controller.create
);

router.delete("/delete/:id", authMiddleware, controller.delete);

module.exports = router;
