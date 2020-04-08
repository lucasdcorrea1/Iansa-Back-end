'use strict'
require('dotenv/config');
const envFile = process.env.NODE_ENV === 'development' ? `.env.dev` : '.env';
require("dotenv").config({ path: `./env/${envFile}` });

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


//Carregando as Models
require('./App/User/Model/user');
require('./App/Slideshow/Model/slideshow');
require('./App/Transparency/Model/transparency');
require('./App/Subscriptions/Model/subscriptions');


app.use(function (req, res, next) {
  var origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Carrega as rotas
app.use('/api/v1', require('./Routes/copyright'));
app.use('/api/v1/slideshow', require('./Routes/slideshowRouts'));
app.use('/api/v1/transparency', require('./Routes/transparencyRouts'));
app.use('/api/v1/user/', require('./Routes/userAuthRouter'));
app.use('/api/v1/subscriptions', require('./Routes/subscriptionsRouts'));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {});

// module.exports = app;