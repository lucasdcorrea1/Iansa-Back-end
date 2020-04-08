'use strict'
require('dotenv/config');

const mailer = require('../../../Modules/mailer');
const authRepository = require('../../Auth/Repositories/authRepository');
const jwtService = require('../../../Helpers/jwtServices');
const validations = require('../../../Validations/validate');

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

            const user = await authRepository.get({ "email": userData.email })
            if (user)
                return res.status(400).send({
                    error: 'Usuário já cadastrado'
                });
                
            const userId = await authRepository.post(userData);
            const token = await jwtService.generateToken({
                id: userId
            });
            const link = 'https://github.com/lucasdcorrea1'

            mailer.sendMail({
                to: `${userData.email}`,
                bc: process.env.GMAIL_USER,
                from: '"Lucas, of IANSA" <ti@iansa.org.br>',
                subject: `Hi ${name}, please confirm your email!`,
                template: 'auth/verifyemail',
                context: {
                    name,
                    link
                },
            }, (err) => {
                if (err)
                    return res.status(503).send({
                        message: err.message
                    });
            });

            return res.status(200).send({
                token
            });
        } catch (error) {
            res.status(400).send({
                error: `Erro oa realizar cadastro - ${error}`
            });
        }
    }
};