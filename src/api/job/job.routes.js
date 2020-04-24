const router = require("express").Router();
const multer = require("multer");

const controller = require("./job.controller");
const multerConfig = require("../../util/storage/multer");
const authMiddleware = require("../../util/auth/auth");

router.post("/", multer(multerConfig).single("file"), controller.create);

router.get("/", authMiddleware, controller.index);

router.delete("/delete/:id", authMiddleware, controller.delete);

module.exports = router;
