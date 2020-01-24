'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

exports.generateToken = async (params) => {
    return jwt.sign(params, process.env.AUTH, {
        expiresIn: 43200
    });
};
