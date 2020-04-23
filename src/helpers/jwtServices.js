'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


module.exports = {
    async generateToken(params) {
        return jwt.sign(params, process.env.AUTH, {
            expiresIn: 43200
        })
    },
    async validateToken(token) {
        var valid = true;

        jwt.verify(token, process.env.AUTH, (err, decoded) => {
            if (err) {
                valid = false;
            }
        });
        return (valid ? true : false);
    },
}