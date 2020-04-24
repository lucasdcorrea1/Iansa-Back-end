// const mailer = require("../../modules/mailer");
const authRepository = require("../auth/auth-repository");
const jwtService = require("../../util/auth/jwtServices");
const validations = require("../../util/validations/email");
const emailService = require("../../util/email/email.service");
const EMAIL_MESSAGE_TYPES = require("../../util/email/email.types");

module.exports = {
  async create(req, res) {
    try {
      const userData = {
        name: req.body.name.trim(),
        email: req.body.email.trim(),
        password: req.body.password
      };

      if (!validations.validateEmailAddress(userData.email))
        return res.status(400).send({
          error: "E-mail inválido"
        });

      const user = await authRepository.get({ email: userData.email });
      if (user)
        return res.status(400).send({
          error: "Usuário já cadastrado"
        });

      const userId = await authRepository.post(userData);
      const token = await jwtService.generateToken({
        id: userId
      });

      const { name, email } = userData;
      const link = "link para confirmar email";
      await emailService.sendMail(
        email,
        EMAIL_MESSAGE_TYPES.VERIFY_EMAIL,
        name,
        link
      );

      return res.status(200).send({
        token
      });
    } catch (error) {
      res.status(400).send({
        error: `Erro oa realizar cadastro - ${error}`
      });
    }
    return res.status(500).send(JSON.stringify("Erro ao cadastrar usuario"));
  }
};
