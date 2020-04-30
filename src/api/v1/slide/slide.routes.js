import express from 'express';

import * as slideShowInterfaces from './slide.interfaces';
import slideshowController from './slide.controller';
import * as multer from '../../util/storage/multer.config';
import Auth from '../../util/auth';

const router = express.Router();

router.post(
  '/slideshow',
  Auth.authenticateToken,
  multer.configMulter(),
  slideShowInterfaces.postSlide,
  slideshowController.postSlide
);

router.get('/slideshow', slideshowController.getSlides);

router.delete(
  '/slideshow/:id',
  Auth.authenticateToken,
  slideShowInterfaces.deleteSlide,
  slideshowController.deleteSlide
);

export default router;
