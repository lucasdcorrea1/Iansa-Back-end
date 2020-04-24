'use strict'
const express = require('express');
const router = express.Router();
const multer = require("multer");
const controller = require('../../api/Job/jobControllers');
const multerConfig = require("../../middlewares/multer");
const authMiddleware = require('../../middlewares/auth');

router.post("/", multer(multerConfig).single("file"), controller.create);

router.get("/", authMiddleware,  controller.index);

router.delete("/delete/:id", authMiddleware, controller.delete);

module.exports = router;