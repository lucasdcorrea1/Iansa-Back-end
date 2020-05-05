import express from 'express';

import Auth from '../../helpers/auth';
import voluntaryController from './voluntary.controller';
import * as voluntaryInterfaces from './voluntary.interfaces';

const router = express.Router();

router.post(
  '/voluntary',
  Auth.authenticateToken,
  voluntaryInterfaces.postVoluntary,
  voluntaryController.postVoluntary
);

router.get(
  '/voluntary',
  Auth.authenticateToken,
  voluntaryController.getVoluntaries
);

export default router;
