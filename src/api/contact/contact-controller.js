const repository = require("../subscription/subscription-repository");
const mailer = require("../../modules/mailer");

module.exports = {
  async create(req, res) {
    try {
      const contactData = {
        email: req.body.email.trim(),
        name: req.body.name.trim(),
        phone: req.body.phone.trim(),
        message: req.body.message.trim()
      };

      await repository.post(contactData);

      mailer.sendMail({
        to: `${contactData.email}`,
        from: '"IANSA" <ti@iansa.org.br>',
        subject: `Obrigado por enviar sua mensagem!`,
        template: "subs/subscription"
      });

      return res.json({
        message: `Mensagem enviada com sucesso`,
        typeMessage: "success"
      });
    } catch (error) {
      res.json({
        message: `Erro oa enviar mensagem - ${error}`,
        typeMessage: "error"
      });
    }
    return res.status(500).send(JSON.stringify("Erro ao criar contato"));
  },

  async index(req, res) {
    return res.json(await repository.get());
  }
};
