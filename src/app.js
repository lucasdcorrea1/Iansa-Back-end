'use strict'
require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

//Carregando as Models
require('./App/Model/user');
require('./App/Model/slideshow');
// require('./App/Model/transparency');

// Carrega as rotas
const copyright = require('./Routes/copyright');
const slideshowRoutes = require('./Routes/slideshowRouts');
// const transparency = require('./Routes/transparencyRouts');
const authRoutes = require('./Routes/authUserRoutes');

app.use(function (req, res, next) {
  var origin = req.get('origin'); 
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/', copyright);
app.use('/slideshow', slideshowRoutes);
// app.use('transparency', transparency);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
});
