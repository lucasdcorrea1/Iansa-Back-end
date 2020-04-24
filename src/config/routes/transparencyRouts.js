'use strict'
const express = require('express');
const router = express.Router();
const multer = require("multer");
const controller = require('../../api/transparency/transparencyController');
const multerConfig = require("../../middlewares/multer");
const authMiddleware = require('../../middlewares/auth');

router.get("/",  controller.index);

router.post("/", authMiddleware, multer(multerConfig).single("file"), controller.create);

router.delete("/delete/:id", authMiddleware, controller.delete);

module.exports = router;