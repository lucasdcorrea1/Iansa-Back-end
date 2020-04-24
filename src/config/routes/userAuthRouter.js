'use strict'
const express = require('express');
const router = express.Router();
const authController = require('../../api/Auth/authController');
const userController = require('../../api/User/userController');
const authMiddleware = require('../../middlewares/auth');

router.post('/auth', authController.authenticate);
// router.post('/authenticatetoken', authController.authenticateToken);
router.post('/forgotpassword', authController.forgotPassword);

router.put('/resetpassword', authController.resetPassword);

router.post('/register', authMiddleware, userController.create);

module.exports = router;