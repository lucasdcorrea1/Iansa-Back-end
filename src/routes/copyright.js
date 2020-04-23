'use strict';

require('dotenv/config');
const express = require('express');
const router = express.Router();

var Development = [process.env.APP_NAME];
Development.push({
   'Made by': 'Lucas Damas Corrês',
    GitHub: 'https://github.com/lucasdcorrea1'
})


const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        Development
    });
});
module.exports = route;