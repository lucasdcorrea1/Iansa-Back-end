'use strict'

const express = require('express');
const router = express.Router();
const multer = require("multer");
const controller = require('../app/controllers/slideshow');
const multerConfig = require("../config/multer");
const authMiddleware = require('../app/middlewares/auth');

router.get("/getAll",  controller.getPhoto);

router.use(authMiddleware);
router.post("/create", multer(multerConfig).single("file"), controller.post);
// router.delete("/posts/:id", controller.delete);

module.exports = router;