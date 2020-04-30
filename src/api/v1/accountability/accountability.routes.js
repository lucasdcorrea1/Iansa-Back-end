import multer from "multer";
import express from "express";

import accountabilityController from "./accountability.controller";
import multerConfig from "../../util/storage/multer.config";
import AuthenticateMiddleware from "../../util/auth";

const router = express.Router();

router.get("/accountability", accountabilityController.index);

router.post(
  "/accountability",
  AuthenticateMiddleware,
  multer(multerConfig).single("file"),
  accountabilityController.create
);

router.delete(
  "/accountability/delete/:id",
  AuthenticateMiddleware,
  accountabilityController.delete
);

export default router;
