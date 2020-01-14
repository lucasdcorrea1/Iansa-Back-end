'use strict'

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const mailer = require('../../modules/mailer');
const authRepository = require('../repositories/authRepository');
const jwtService = require('../services/jwtServices')
const validations = require('../validations/Validate');

require('dotenv/config');

exports.register = async (req, res) => {
    try {
        const {
            email,
            name
        } = req.body;

        if (!validations.validateEmailAddress(email))
            return res.status(400).send({
                error: 'E-mail inválido'
            });

        if (await authRepository.get({ email }))
            return res.status(400).send({
                error: 'Usuário já cadastrado'
            });

        const userId = await authRepository.post(req.body);
        const token = await jwtService.generateToken({
            id: userId
        });

            mailer.sendMail({
                to: email,
                from: '"IANSA" <no-reply@datatongji@gmail.com>',
                subject: 'Registro finalizado!',
                template: 'auth/new_user',
                context: { name }
            }, (err) => {
                if (err)
                    return res.status(400).send({
                        error: err + 'Cannot send forgot password email'
                    });
                return res.status(200).send(JSON.stringify(token));
            });

            res.status(200).send({
                token: token
            });

    } catch (err) {
        return res.status(400).send({
            error: `Falha de registro ${err}`
        });
    }
};

exports.authenticate = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const user = await authRepository.getUserAuth({
        email
    });

    if (!user)
        return res.status(400).send({
            error: 'Usuário ou senha inválidos'
        });

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({
            error: 'Usuário ou senha inválidos'
        });


    res.send(JSON.stringify(
        generateToken({
            id: user.id,
        })));

};

exports.authenticateToken = async (req, res) => {
    const {
        token
    } = req.body;

    jwt.verify(token, process.env.AUTH, (err, decoded) => {
        if (err) return res.status(401).send(JSON.stringify('NO'));

        return res.status(200).send(JSON.stringify('OK'));
    });
};

exports.forgotPassword = async (req, res) => {
    const {
        email
    } = req.body

    try {
        const user = await authRepository.get({ email });

        if (!user)
            return res.status(400).send({
                error: 'Usuário inválido'
            });

        const token = crypto.randomBytes(20).toString('hex');
        const name = user.name;
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await authRepository.put(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from: '"Ponto Hora" <no-reply@dot.hour@gmail.com>',
            subject: 'Resetar senha',
            template: 'auth/forgot_password',
            context: {
                token,
                name
            },
        }, (err) => {
            if (err)
                return res.status(400).send({
                    error: err + 'Cannot send forgot password email'
                });

            return res.status(200).send(JSON.stringify(token));

        })

    } catch (err) {
        res.status(400).send({
            error: err + 'Erro ao tentar recuperar password'
        });
    }
};

exports.resetPassword = async (req, res) => {
    const {
        email,
        token,
        password
    } = req.body

    try {
        const user = await authRepository.getUserReset({ email });
        const now = new Date();

        if (!user)
            return res.status(400).send({
                error: 'Usuário inválido !'
            });

        if (token !== user.passwordResetToken)
            return res.status(400).send({
                error: 'Token inválido !'
            });

        if (!now > user.passwordResetExpires)
            return res.status(400).send({
                error: 'Token expirado !'
            })

        await authRepository.putPasswrd(user,password);

        user.password = undefined

        return res.status(200).send(JSON.stringify("OK"));

    } catch (err) {
        res.status(400).send({
            error: 'Erro ao resetar senha'
        })
    }

};

exports.validToken = async (req, res) => {
    const {
        email,
        token
    } = req.body

    try {
        const now = new Date();
        const user = await User.findOne({
                email
            })
            .select('+passwordResetToken passwordResetExpires');

        if (!user)
            return res.status(400).send({
                error: 'Usuário inválido !'
            });

        if (token !== user.passwordResetToken)
            return res.status(400).send({
                error: 'Token inválido !'
            });


        if (!now > user.passwordResetExpires)
            return res.status(400).send({
                error: 'Token expirado !'
            })

        return res.status(200).send(JSON.stringify('OK'));
    } catch (err) {
        res.status(400).send({
            error: 'Erro ao resetar password'
        })
    }
};
