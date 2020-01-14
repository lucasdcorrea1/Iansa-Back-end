'use strict'

require('dotenv/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const mailer = require('../../modules/mailer');
const authRepository = require('../repositories/authRepository');
const jwtService = require('../services/jwtServices')
const validations = require('../validations/Validate');

module.exports = {
    async register(req, res) {
        try {
            const userData = {
                name: req.body.name.trim(),
                email: req.body.email.trim(),
                password: req.body.password
            };
            const name = userData.name;

            if (!validations.validateEmailAddress(userData.email))
                return res.status(400).send({
                    error: 'E-mail inválido'
                });

            if (await authRepository.get({ "email": userData.email }))
                return res.status(400).send({
                    error: 'Usuário já cadastrado'
                });

            const userId = await authRepository.post(userData);
            const token = await jwtService.generateToken({
                id: userId
            });

            mailer.sendMail({
                to: userData.email,
                from: '"IANSA" <no-reply@datatongji@gmail.com>',
                subject: 'Registro finalizado!',
                template: 'auth/new_user',
                context: { name }
            }, (error) => {
                if (error)
                    return res.status(400).send({
                        error: `${error} Cannot send forgot password email`
                    });
                return res.status(200).send({ token: token });
            });

            return res.status(200).send({
                token: token
            });

        } catch (error) {
            res.status(400).send({
                error: `Erro oa realizar cadastro ${error}`
            });
        }
    },

    async authenticate(req, res) {
        const {
            email,
            password
        } = req.body;

        const user = await authRepository.getUserAuth(
            { "email": email.trim() }
        );

        if (!user)
            return res.status(400).send({
                error: 'Usuário ou senha inválidos!'
            });

        if (!await bcrypt.compare(password.trim(), user.password))
            return res.status(400).send({
                error: 'Usuário ou senha inválidos!'
            });

        const token = await jwtService.generateToken({
            id: user.id,
        });

        return res.status(200).send({ token: token });
    },

    async authenticateToken(req, res) {
        const {
            token
        } = req.body;

        jwt.verify(token, process.env.AUTH, (err, decoded) => {
            if (err) return res.status(401).send(JSON.stringify('NO'));

            return res.status(200).send(JSON.stringify('OK'));
        });
    },

    async forgotPassword(req, res) {
        try {
            const { email } = req.body
            const user = await authRepository.get({ email: email.trim() });

            if (!user)
                return res.status(400).send({
                    error: 'Usuário inválido!'
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
                to: req.body.email.trim(),
                from: '"IANSA" <no-reply@datatongji@gmail.com>',
                subject: 'Resetar senha',
                template: 'auth/forgot_password',
                context: {
                    token,
                    name
                },
            }, (error) => {
                if (error)
                    return res.status(error.pr).send({
                        error: `Não é possível enviar o email da senha esquecida: ${error} `
                    });

                return res.status(200).send(JSON.stringify(`Enviamos o token de autorizaão para o e-mail ${email.trim()}`));
            })
        } catch (error) {
            return res.status(400).send({
                error: `Erro ao tentar solicitar a recuperação de senha: ${error}`
            });
        };
    },

    async resetPassword(req, res) {
        const {
            email,
            token,
            password
        } = req.body

        try {
            const user = await authRepository.getUserReset({ email: email.trim() });
            const now = new Date();

            if (!user)
                return res.status(400).send({
                    error: 'Usuário inválido!'
                });

            if (token.trim() !== user.passwordResetToken)
                return res.status(400).send({
                    error: 'Token inválido!'
                });

            if (!now > user.passwordResetExpires)
                return res.status(400).send({
                    error: 'Token expirado!'
                });

            if (await bcrypt.compare(password.trim(), user.password))
                return res.status(400).send({
                    error: 'Utilize uma senha diferente da atual!'
                });

            await authRepository.putPasswrd(user, password);

            user.password = undefined

            return res.status(200).send(JSON.stringify("Senha atualizada com sucesso!"));

        } catch (error) {
            res.status(400).send({
                error: `Erro ao resetar senha: ${error}`
            })
        }

    },

    async validToken(req, res) {
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
                    error: 'Usuário inválido!'
                });

            if (token !== user.passwordResetToken)
                return res.status(400).send({
                    error: 'Token inválido!'
                });


            if (!now > user.passwordResetExpires)
                return res.status(400).send({
                    error: 'Token expirado!'
                })

            return res.status(200).send(JSON.stringify('Tokem válido!'));
        } catch (err) {
            res.status(400).send({
                error: 'Erro ao resetar password'
            })
        }
    },
};
