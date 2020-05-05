import express from 'express';

import Auth from '../../util/auth';
import voluntaryController from './voluntary.controller';
import * as voluntaryInterfaces from './voluntary.interfaces';

const router = express.Router();

router.post(
  '/voluntary',
  voluntaryInterfaces.postVoluntary,
  voluntaryController.postVoluntary
);

router.get(
  '/voluntary',
  Auth.authenticateToken,
  voluntaryController.getVoluntaries
);

export default router;
