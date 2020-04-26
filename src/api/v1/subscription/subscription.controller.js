import repository from "./subscription.dao";
import emailService from "../../util/email/email.service";
import EMAIL_MESSAGE_TYPES from "../../util/email/email.types";

class SubscriptionController {
  static async create(req, res) {
    const subscriptionData = {
      email: req.body.email.trim(),
      signup: req.body.signup
    };

    try {
      if (await repository.getByEmail(subscriptionData.email)) {
        return res.json({
          message: "E-mail já registrado!",
          typeMessage: "warning"
        });
      }

      await repository.post(subscriptionData);

      await emailService.sendMail(
        subscriptionData.email,
        EMAIL_MESSAGE_TYPES.SUBSCRIBER
      );

      return res.json({
        message: `Enviamos um e-mail para ${subscriptionData.email} confirmando a inscrição ;)`,
        typeMessage: "success"
      });
    } catch (error) {
      res.json({
        message: `Erro ao inscrever-se - ${error}`,
        typeMessage: "error"
      });
    }
    return res.status(500).send(JSON.stringify("Erro ao inscrever"));
  }

  static async index(req, res) {
    return res.json(await repository.get());
  }
}

export default SubscriptionController;
