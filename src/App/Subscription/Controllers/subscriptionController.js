'use strict'
require('dotenv/config');
const repository = require('../Repositories/subscriptionRepository');
const mailer = require('../../../Modules/mailer');

module.exports = {
  async create(req, res) {
    const subscriptionData = {
      email: req.body.email.trim(),
      signup: req.body.signup,
    };

    try {

      if (await repository.getByEmail(subscriptionData.email)) {
        return res.json({ 
          message: 'E-mail já registrado!',
          typeMessage: 'warning' 
        });
      };

      await repository.post(subscriptionData);

      mailer.sendMail({
        to: `${subscriptionData.email}`,
        bc: process.env.GMAIL_USER,
        from: '"IANSA" <ti@iansa.org.br>',
        subject: `Obrigado por inscrever-se em nossa plataforma!`,
        template: 'subs/subscription',
      }, (err) => {
        if (err)
          console.log(err)
      });

      return res.json({
        message: `Enviamos um e-mail para ${subscriptionData.email} confirmando a inscrição ;)`,
        typeMessage: 'success'
      });

    } catch (error) {
      res.json({
        message: `Erro oa inscrever-se - ${error}`,
        typeMessage: 'error'
      });
    }
  },

  async index(req, res) {
    return res.json(await repository.get());
  },
};