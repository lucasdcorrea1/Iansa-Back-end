'use strict'
const express = require('express');
const router = express.Router();
const multer = require("multer");
const controller = require('../App/Job/Controllers/jobControllers');
const multerConfig = require("../Middlewares/multer");
const authMiddleware = require('../Middlewares/auth');

router.post("/", multer(multerConfig).single("file"), controller.create);

router.get("/", authMiddleware,  controller.index);

router.delete("/delete/:id", authMiddleware, controller.delete);

module.exports = router;