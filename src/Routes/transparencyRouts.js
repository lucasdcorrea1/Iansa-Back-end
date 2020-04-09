'use strict'
const express = require('express');
const router = express.Router();
const multer = require("multer");
const controller = require('../App/Transparency/Controllers/transparency');
const multerConfig = require("../Middlewares/multer");
const authMiddleware = require('../Middlewares/auth');

router.get("/",  controller.index);

router.post("/", authMiddleware, multer(multerConfig).single("file"), controller.create);

router.delete("/delete/:id", authMiddleware, controller.delete);

module.exports = router;