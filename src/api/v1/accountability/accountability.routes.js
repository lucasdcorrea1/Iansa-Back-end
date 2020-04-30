import multer from 'multer';
import express from 'express';

import accountabilityController from './accountability.controller';
import multerConfig from '../../util/storage/multer.config';
import Auth from '../../util/auth';

const router = express.Router();

router.get('/accountability', accountabilityController.index);

router.post(
  '/accountability',
  Auth.authenticateToken,
  multer(multerConfig).single('file'),
  accountabilityController.create
);

router.delete(
  '/accountability/delete/:id',
  Auth.authenticateToken,
  accountabilityController.delete
);

export default router;
