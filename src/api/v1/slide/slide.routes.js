import express from 'express';

import Auth from '../../util/auth';
import slideshowController from './slide.controller';
import * as slideShowInterfaces from './slide.interfaces';
import * as multer from '../../util/storage/multer.config';

const router = express.Router();

router.post(
  '/slide',
  Auth.authenticateToken,
  multer.configMulter(),
  slideShowInterfaces.postSlide,
  slideshowController.postSlide
);

router.get('/slide', slideshowController.getSlides);

router.delete(
  '/slide/:id',
  Auth.authenticateToken,
  slideShowInterfaces.deleteSlide,
  slideshowController.deleteSlide
);

export default router;
