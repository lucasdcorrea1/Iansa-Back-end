'use strict';
const express = require('express');
const router = express.Router();

const object = {
    nome: 'Lucas Damas Corrêa',
    idade: '19',
    profissao: 'Desenvolvedor'
};

JSON.stringify(object);

const routes = router.get('/', (req, res, next) => {
    res.status(200).send({
        object
    });
});

module.exports = routes;