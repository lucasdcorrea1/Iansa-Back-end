'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Env = require( "../config/environment");


module.exports = {
    async generateToken(params) {
        return jwt.sign(params, Env.auth, {
            expiresIn: 43200
        })
    },
    async validateToken(token) {
        var valid = true;

        jwt.verify(token, Env.auth, (err, decoded) => {
            if (err) {
                valid = false;
            }
        });
        return (valid ? true : false);
    },
}