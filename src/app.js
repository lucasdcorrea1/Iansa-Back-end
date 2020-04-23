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
require('./app/User/Model/user');
require('./app/Slideshow/Model/slideshow');
require('./app/Transparency/Model/transparency');
require('./app/Subscription/Model/subscription');
require('./app/Contact/Model/contact');
require('./app/Job/Model/job');

app.use(function (req, res, next) {
  var origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//Load routes

//Alterar rotas no front-end
app.use('/api/v1/slideshow', require('./routes/slideshowRouts'));
app.use('/api/v1/transparency', require('./routes/transparencyRouts'));

//New standard
app.use('/api/v1', require('./routes/copyright'));
app.use('/api/v1/subscription', require('./routes/subscriptionRouts'));
app.use('/api/v1/constact', require('./routes/contactRouts'));
app.use('/api/v1/job', require('./routes/jobRouts'));
app.use('/api/v1/user', require('./routes/userAuthRouter'));

app.use(errors());

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {});

// module.exports = app;