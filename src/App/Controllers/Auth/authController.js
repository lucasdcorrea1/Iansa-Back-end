'use strict'
require('dotenv/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authRepository = require('../../Repositories/authRepository');
const jwtService = require('../../Services/jwtServices');
const mailer = require('../../../Modules/mailer')

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
            // try {
            //    const test = fs.readFile('./src/App/Controllers/Auth/teste.txt', function (err, data) {
            //     console.log(data);
            //   });
            //   console.log(test);

            // } catch (e) {
            //     console.log(e)  // If any error is thrown, you can see the message.
            // }
            mailer.sendMail({
                    to: `${email.trim()}`,
                    from: "I.A.N.S.A <datatongji@gmail.com>",
                    subject: "reset de senha",
                    template: 'Auth/forgot_password',
                    context: {                         name,
                        token
                         }
                }).then(message => {
					console.log(message)
                    return res.status(200).send(
                        JSON.stringify(`Enviamos o token de autorização para o e-mail ${message}`)
                    );
				}).catch(error => {
                    console.log(error)
					return res.status(400).send({
						error: `Erro oa realizar cadastro ${error}`
					});
                });
                
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
