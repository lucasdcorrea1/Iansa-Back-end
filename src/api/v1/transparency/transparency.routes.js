import multer from "multer";
import express from "express";

import controller from "./transparency.controller";
import multerConfig from "../../util/storage/multer.config";
import authMiddleware from "../../util/auth/auth";

const router = express.Router();

router.get("/transparency", controller.index);

router.post(
  "/transparency",
  authMiddleware,
  multer(multerConfig).single("file"),
  controller.create
);

router.delete("/transparency/delete/:id", authMiddleware, controller.delete);

export default router;
