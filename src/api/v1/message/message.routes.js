import express from 'express';

import * as Validator from './message.interfaces';
import messageController from './message.controller';

const router = express.Router();

router.post('/message', Validator.postMessage, messageController.postMessage);

export default router;
