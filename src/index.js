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
app.use('/api/v1/slideshow', require('./api/slideshow/slideshow-routes'));
app.use('/api/v1/transparency', require('./api/transparency/transparency-routes'));

//New standard
app.use('/api/v1', require('./api/copyright/copyright-routes'));
app.use('/api/v1/subscription', require('./api/subscription/subscription-routes'));
app.use('/api/v1/constact', require('./api/contact/contact-routes'));
app.use('/api/v1/job', require('./api/job/job-routes'));
app.use('/api/v1/user', require('./api/user/user-routes'));

app.use(errors());

const PORT = Env.port || 3333;
app.listen(PORT, () => {});

// module.exports = app;