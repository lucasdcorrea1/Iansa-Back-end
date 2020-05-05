import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errors as celebrateErrors } from 'celebrate';
import expressOasGenerator from 'express-oas-generator';

import { buildResponse as Response } from './api/helpers/response';

// set env
const envFile = process.env.NODE_ENV === 'development' ? `.env.dev` : '.env';
require('dotenv').config({ path: `./env/${envFile}` });

// import models
require('./api/v1/user/user.model');
require('./api/v1/slide/slide.model');
require('./api/v1/accountability/accountability.model');
require('./api/v1/subscriber/subscriber.model');
require('./api/v1/message/message.model');
require('./api/v1/voluntary/voluntary.model');

// create app
const app = express();

// docs responses
expressOasGenerator.handleResponses(app, {});

// configs
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// headers
app.use((req, res, next) => {
  const origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// routes
app.use('/api/v1', require('./api/v1/status/status.routes').default);
app.use('/api/v1', require('./api/v1/message/message.routes').default);
app.use('/api/v1', require('./api/v1/slide/slide.routes').default);
app.use('/api/v1', require('./api/v1/voluntary/voluntary.routes').default);
app.use('/api/v1', require('./api/v1/user/user.routes').default);
app.use('/api/v1', require('./api/v1/subscriber/subscriber.routes').default);
app.use(
  '/api/v1',
  require('./api/v1/accountability/accountability.routes').default
);

// errors
app.use(celebrateErrors());

// not found resources
app.use((req, res) => Response(res, 404, 'Recurso não encontrado', null, true));

// docs requests
expressOasGenerator.handleRequests();

// run app
app.listen(process.env.PORT || 3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port:', process.env.PORT || 3333);
});
