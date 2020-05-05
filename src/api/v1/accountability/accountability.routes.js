import express from 'express';

import Auth from '../../helpers/auth';
import accountabilityController from './accountability.controller';
import * as accountabilityInterfaces from './accountability.interfaces';
import * as multer from '../../services/storage/multer.config';

const router = express.Router();

router.post(
  '/accountability',
  Auth.authenticateToken,
  multer.configMulterSingleFile(),
  (req, res, next) => {
    multer.validateSchema(
      req,
      res,
      next,
      accountabilityInterfaces.postAccountability,
      'transparência'
    );
  },
  accountabilityController.postAccountability
);

router.get('/accountability', accountabilityController.getAccountabilities);

router.delete(
  '/accountability/:id',
  Auth.authenticateToken,
  accountabilityController.delete
);

export default router;
