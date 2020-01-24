'use strict'
const express = require('express');
const multer = require("multer");
const router = express.Router();

const controller = require('../App/Controllers/Slideshow/slideshowController');
const multerConfig = require("../Config/multer");
const authMiddleware = require('../Middlewares/auth');

router.get("/getAll",  controller.getImage);

router.use(authMiddleware);
router.post("/create", multer(multerConfig).single("file"), controller.post);
// router.delete("/posts/:id", controller.delete);

module.exports = router;