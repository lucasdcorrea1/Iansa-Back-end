'use strict'
require('dotenv/config');
const envFile = process.env.NODE_ENV === 'development' ? `.env.dev` : '.env';
require("dotenv").config({ path: `./env/${envFile}` });
console.log(process.env.APP_NAME)

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
app.use('/',  require('./Routes/copyright'));
app.use('/slideshow', require('./Routes/slideshowRouts'));
app.use('/transparency', require('./Routes/transparencyRouts'));
app.use('/auth', require('./Routes/authUserRoutes'));
app.use('/subscriptions', require('./Routes/subscriptionsRouts'));

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
// });

module.exports = app;