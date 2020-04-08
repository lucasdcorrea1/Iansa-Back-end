'use strict'
const express = require('express');
const router = express.Router();
const controller = require('../App/Subscriptions/Controllers/subscriptionsController');
const authMiddleware = require('../Middlewares/auth');

router.get("/", authMiddleware, controller.index);
router.post("/", controller.create);

module.exports = router;