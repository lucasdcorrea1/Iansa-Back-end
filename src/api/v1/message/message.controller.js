import messageRepository from "./message.dao";
import emailService from "../../util/email/email.service";
import EMAIL_MESSAGE_TYPES from "../../util/email/email.types";
import { okResponse, errorResponse } from "../../util/responses/base-response";

class MessageController {
  static async saveMessage(req, res) {
    try {
      const email = req.body.email.trim();
      const name = req.body.name.trim();
      const phone = req.body.phone.trim();
      const message = req.body.message.trim();

      await messageRepository.post({
        email,
        name,
        phone,
        message
      });

      await emailService.sendMail(email, EMAIL_MESSAGE_TYPES.MESSAGE, name);

      return okResponse(res, "Mensagem salva com sucesso.");
    } catch (error) {
      return errorResponse(res, `Erro ao salvar mensagem: ${error}.`);
    }
  }
}

export default MessageController;
