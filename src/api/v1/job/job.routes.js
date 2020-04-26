import multer from "multer";
import express from "express";

import controller from "./job.controller";
import multerConfig from "../../util/storage/multer.config";
import authMiddleware from "../../util/auth/auth";

const router = express.Router();

router.post("/job", multer(multerConfig).single("file"), controller.create);

router.get("/job", authMiddleware, controller.index);

router.delete("job/delete/:id", authMiddleware, controller.delete);

export default router;
