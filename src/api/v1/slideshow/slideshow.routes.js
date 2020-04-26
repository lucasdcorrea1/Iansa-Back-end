import express from "express";
import multer from "multer";

import controller from "./slideshow.controller";
import multerConfig from "../../util/storage/multer.config";
import Auth from "../../util/auth/auth";

const router = express.Router();

router.get("/slideshow", controller.index);

router.post(
  "/slideshow",
  Auth,
  multer(multerConfig).single("file"),
  controller.create
);

router.delete("/slideshow/delete/:id", Auth, controller.delete);

export default router;
