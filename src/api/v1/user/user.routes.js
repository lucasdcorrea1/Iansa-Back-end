import express from 'express';

import Auth from '../../helpers/auth';
import userController from './user.controller';
import * as userInterfaces from './user.interfaces';

const router = express.Router();

router.post('/user/singup', userInterfaces.singUp, userController.singUp);

router.post('/user/login', userInterfaces.login, userController.login);

router.post(
  '/user/forgotpassword',
  userInterfaces.forgotPassword,
  userController.forgotPassword
);

router.put(
  '/user/resetpassword',
  Auth.authenticateToken,
  userInterfaces.resetPassword,
  userController.resetPassword
);

export default router;
