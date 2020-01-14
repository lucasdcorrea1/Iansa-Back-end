'use strict'

require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

//Carregando as Models
require('./app/model/User');
require('./app/model/slideshow');

// Carrega as rotas
const copyright = require('./routes/copyright');
const slideshowRoutes = require('./routes/slideshowRouts');
const authRoutes = require('./routes/authRoutes');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', copyright);
app.use('/slideshow', slideshowRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
});