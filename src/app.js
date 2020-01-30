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
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', copyright);
app.use('/slideshow', slideshowRoutes);
// app.use('transparency', transparency);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
});
