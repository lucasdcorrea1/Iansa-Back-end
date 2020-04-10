'use strict'

require('dotenv/config');
const envFile = process.env.NODE_ENV === 'development' ? `.env.dev` : '.env';
require("dotenv").config({ path: `./env/${envFile}` });

const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const app = express();

app.use(express.json());
app.use(cors());

//Load Models
require('./App/User/Model/user');
require('./App/Slideshow/Model/slideshow');
require('./App/Transparency/Model/transparency');
require('./App/Subscription/Model/subscription');
require('./App/Contact/Model/contact');
require('./App/Job/Model/job');

app.use(function (req, res, next) {
  var origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//Load routes

//Alterar rotas no front-end
app.use('/api/v1/slideshow', require('./Routes/slideshowRouts'));
app.use('/api/v1/transparency', require('./Routes/transparencyRouts'));

//New standard
app.use('/api/v1', require('./Routes/copyright'));
app.use('/api/v1/subscription', require('./Routes/subscriptionRouts'));
app.use('/api/v1/constact', require('./Routes/contactRouts'));
app.use('/api/v1/job', require('./Routes/jobRouts'));
app.use('/api/v1/user', require('./Routes/userAuthRouter'));

app.use(errors());

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {});

// module.exports = app;