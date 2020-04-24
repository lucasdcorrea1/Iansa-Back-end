'use strict'
const express = require('express');
const multer = require("multer");
const router = express.Router();

const controller = require('./slideshow-controller');
const multerConfig = require("../../middlewares/multer");
const authMiddleware = require('../../middlewares/auth');

router.get("/",  controller.index);

router.post("/", authMiddleware, multer(multerConfig).single("file"), controller.create);

router.delete("/delete/:id", authMiddleware, controller.delete);

module.exports = router;