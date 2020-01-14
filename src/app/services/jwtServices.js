
'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.generateToken = async (params) => {
   const token = jwt.sign(params, process.env.AUTH, {
    expiresIn: 43200
});
    return token;
};

