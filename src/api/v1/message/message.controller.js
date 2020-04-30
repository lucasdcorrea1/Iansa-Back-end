import messageRepository from './message.dao';
import emailService from '../../util/email/email.service';
import EMAIL_MESSAGE_TYPES from '../../util/email/email.types';
import { buildResponse as Response } from '../../util/responses/base-response';

class MessageController {
  static async postMessage(req, res) {
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

      return Response(res, 200, 'Mensagem salva com sucesso.');
    } catch (error) {
      return Response(res, 500, `Erro ao salvar mensagem: ${error}.`);
    }
  }
}

export default MessageController;
