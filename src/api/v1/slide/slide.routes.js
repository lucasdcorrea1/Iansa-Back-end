import express from 'express';

import Auth from '../../helpers/auth';
import slideController from './slide.controller';
import * as slideInterfaces from './slide.interfaces';
import * as multer from '../../services/storage/multer.config';

const router = express.Router();

router.post(
  '/slide',
  Auth.authenticateToken,
  multer.configMulterSingleFile(),
  (req, res, next) => {
    multer.validateSchema(req, res, next, slideInterfaces.postSlide, 'slide');
  },
  slideController.postSlide
);

router.get('/slide', slideController.getSlides);

router.delete(
  '/slide/:id',
  Auth.authenticateToken,
  slideController.deleteSlide
);

export default router;
