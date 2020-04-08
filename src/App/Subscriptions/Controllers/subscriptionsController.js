'use strict'
require('dotenv/config');
const repository = require('../Repositories/subscriptionsRepository')
const mailer = require('../../../Modules/mailer');

module.exports = {
  async create(req, res) {
    try {
      const subscriptions = {
        email: req.body.email.trim(),
        signup: req.body.signup,
      };

      const email = await repository.getByEmail(subscriptions.email)
      if (email) {
        return res.json({
          message: 'E-mail já registrado!'
        });
      }

      await repository.post(subscriptions);

      mailer.sendMail({
        to: `${subscriptions.email}`,
        bc: process.env.GMAIL_USER,
        from: '"IANSA" <ti@iansa.org.br>',
        subject: `Hi , please confirm your email!`,
        template: 'auth/verifyemail',
        context: {
          name,
          link
        },
      }, (err) => {
        if (err)
          return res.status(503).json({
            message: err.message
          });
      });

      return res.json({
        repository
      });

    } catch (error) {
      res.json({
        error: `Erro oa inscrever-se - ${error}`
      });
    }
  },
  
  async index(req, res) {
    return await repository.get();
  },
};