'use strict';

const express = require('express');
const router = express.Router();

var object = {
    nome: 'Lucas Damas Corrêa',
    idade: '19',
    profissao: 'Desenvolvedor'
};

JSON.stringify(object);

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        object
    });
});

module.exports = router;