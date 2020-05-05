import express from 'express';

import Auth from '../../util/auth';
import accountabilityController from './accountability.controller';
import * as accountabilityInterfaces from './accountability.interfaces';
import * as multer from '../../util/storage/multer.config';

const router = express.Router();

router.post(
  '/accountability',
  Auth.authenticateToken,
  multer.configMulter(),
  accountabilityInterfaces.postAccountability,
  accountabilityController.postAccountability
);

router.get('/accountability', accountabilityController.getAccountabilities);

router.delete(
  '/accountability/:id',
  Auth.authenticateToken,
  accountabilityController.delete
);

export default router;
