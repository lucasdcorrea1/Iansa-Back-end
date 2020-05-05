import express from 'express';

import Auth from '../../util/auth';
import subscriberController from './subscriber.controller';
import * as subscriberInterfaces from './subscriber.interfaces';

const router = express.Router();

router.post(
  '/subscriber',
  subscriberInterfaces.postSubscriber,
  subscriberController.postSubscriber
);

router.get(
  '/subscriber',
  Auth.authenticateToken,
  subscriberController.getSubscribers
);

export default router;
