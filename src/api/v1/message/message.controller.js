import messageRepository from './message.dao';
import emailService from '../../services/email/email.service';
import emailMessageTypes from '../../services/email/email.types';
import { buildResponse as Response } from '../../helpers/response';

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

      await emailService.sendMail(email, emailMessageTypes.MESSAGE, name);

      return Response(res, 200, 'Mensagem salva com sucesso.');
    } catch (error) {
      return Response(res, 500, `Erro ao salvar mensagem: ${error}.`);
    }
  }
}

export default MessageController;
