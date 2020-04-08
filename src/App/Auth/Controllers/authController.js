'use strict'
require('dotenv/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authRepository = require('../Repositories/authRepository');
const jwtService = require('../../../Helpers/jwtServices');
const mailer = require('../../../Modules/mailer');

module.exports = {
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

        return res.status(200).send({
            token: token,
            name: user.name,
            email: user.email,
        });
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
        const { email } = req.body
        const user = await authRepository.get({ email: email.trim() });
        try {

            if (!user)
                return res.status(400).send(
                    { error: 'Usuário não encontrado!' });

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
            const link = 'https://github.com/lucasdcorrea1'

            mailer.sendMail({
                to: `dot.hour@gmail.com`,
                bc: process.env.GMAIL_USER,
                from: '"IANSA" <ti@iansa.org.br>',
                subject: `Hi ${name}, please confirm your email!`,
                template: 'auth/forgotPassword',
                context: {
                    name,
                    link
                },
            }, (err) => {
                if (err)
                console.log( err.message)
            });
            return res.json(
               {sucess: `Enviamos o token de autorização para o e-mail ${email}`}
            );

        } catch (error) {
            return res.status(400).send({
                error: `Erro ao solicitar troca de senha ${error}`
            });
        };
    },

    async resetPassword(req, res) {
        const { email, token, password } = req.body
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

    }
};
