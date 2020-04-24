const contactRepository = require("./contact.dao");
const emailService = require("../../util/email/email.service");
const EMAIL_MESSAGE_TYPES = require("../../util/email/email.types");

module.exports = {
  async create(req, res) {
    try {
      const email = req.body.email.trim();
      const contactData = {
        email,
        name: req.body.name.trim(),
        phone: req.body.phone.trim(),
        message: req.body.message.trim()
      };
      await contactRepository.post(contactData);

      await emailService.sendMail(email, EMAIL_MESSAGE_TYPES.CONTACT);

      return res.json({
        message: `Mensagem enviada com sucesso.`,
        typeMessage: "success"
      });
    } catch (error) {
      res.json({
        message: `Erro ao enviar mensagem - ${error}.`,
        typeMessage: "error"
      });
    }
    return res.status(500).send(JSON.stringify("Erro ao enviar mensagem."));
  }
};
