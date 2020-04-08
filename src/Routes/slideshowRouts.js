'use strict'
const express = require('express');
const multer = require("multer");
const router = express.Router();

const controller = require('../App/Slideshow/Controllers/slideshowController');
const multerConfig = require("../Middlewares/multer");
const authMiddleware = require('../Middlewares/auth');

router.get("/getAll",  controller.getImage);

router.use(authMiddleware);
router.post("/create", multer(multerConfig).single("file"), controller.post);
// router.delete("/posts/:id", controller.delete);

module.exports = router;