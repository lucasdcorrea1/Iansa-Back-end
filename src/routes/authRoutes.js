'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/authController');
const authMiddleware = require('../app/middlewares/auth');

router.post('/authenticate', controller.authenticate);
router.post('/authenticate_token', controller.authenticateToken);
router.post('/forgotpassword', controller.forgotPassword);
router.put('/resetpassword', controller.resetPassword);
router.post('/valid_token', controller.validToken);

router.use(authMiddleware);
router.post('/register', controller.register);

module.exports = router;
