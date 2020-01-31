'use strict'
require('dotenv/config');

const mailer = require('../../../Modules/mailer');
const authRepository = require('../../Repositories/authRepository');
const jwtService = require('../../Services/jwtServices');
const validations = require('../../Validations/validate');

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

            var tmp = global.EMAIL_TMPL_REGISTER.replace('{name}', name)
            sendgred.send(  
                        email.trim(),
                        'Resetar senha!',
                        tmp
                    );
                    
            return res.status(200).send({
                token: token
            });
            // mailer.sendMail({
            //     to: userData.email,
            //     from: '"IANSA" <no-reply@dot.hour@gmail.com>',
            //     subject: 'Registro finalizado!',
            //     template: 'Auth/new_user',
            //     context: { name }
            // }, (error) => {
            //     if (error)
            //         return res.status(400).send({
            //             error: `Erro os realizar registro de usuário : ${error} `
            //         });
            //     return res.status(200).send({
            //         token: token
            //     });
            // });

        } catch (error) {
            res.status(400).send({
                error: `Erro oa realizar cadastro ${error}`
            });
        }
    }
};