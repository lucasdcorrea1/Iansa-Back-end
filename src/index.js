'use strict'

const envFile = process.env.NODE_ENV === 'development' ? `.env.dev` : '.env';
require("dotenv").config({ path: `./env/${envFile}` });

const Env = require( "./config/environment");
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const app = express();

app.use(express.json());
app.use(cors());

//Load Models
require('./models/user');
require('./models/slideshow');
require('./models/transparency');
require('./models/subscription');
require('./models/contact');
require('./models/job');

app.use(function (req, res, next) {
  var origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//Load routes

//Alterar rotas no front-end
app.use('/api/v1/slideshow', require('./config/routes/slideshowRouts'));
app.use('/api/v1/transparency', require('./config/routes/transparencyRouts'));

//New standard
app.use('/api/v1', require('./config/routes/copyright'));
app.use('/api/v1/subscription', require('./config/routes/subscriptionRouts'));
app.use('/api/v1/constact', require('./config/routes/contactRouts'));
app.use('/api/v1/job', require('./config/routes/jobRouts'));
app.use('/api/v1/user', require('./config/routes/userAuthRouter'));

app.use(errors());

const PORT = Env.port || 3333;
app.listen(PORT, () => {});

// module.exports = app;