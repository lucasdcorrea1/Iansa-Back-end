import express from 'express';

import env from '../../config/environment';
import { buildResponse as Response } from '../../helpers/response';

const router = express.Router();

router.get('/', (req, res) => {
  const api = [];
  api.push({
    name: env.api.projectName,
    version: env.api.projectVersion,
    date: new Date().toUTCString()
  });
  // api.push({ env }); // descomente isso para ver as envs
  return Response(res, 200, 'API Status', api);
});

export default router;
