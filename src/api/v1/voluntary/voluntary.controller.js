import voluntaryDao from './voluntary.dao';
import emailService from '../../util/email/email.service';
import EMAIL_MESSAGE_TYPES from '../../util/email/email.types';
import { buildResponse as Response } from '../../util/responses/base-response';

class VoluntaryController {
  static async postVoluntary(req, res) {
    try {
      const email = req.body.email.trim();
      const active = req.body.active || true;

      if (await voluntaryDao.getByEmail(email)) {
        return Response(res, 409, 'Voluntário já inscrito');
      }
      await voluntaryDao.post({ email, active });

      const unsubscribeLink = 'https://google.com';
      await emailService.sendMail(
        email,
        EMAIL_MESSAGE_TYPES.VOLUNTARY,
        null,
        unsubscribeLink
      );
      return Response(res, 201, `Voluntário ${email} inscrito com sucesso`);
    } catch (error) {
      return Response(res, 500, `Erro ao cadastrar voluntário: ${error}`);
    }
  }

  static async getVoluntaries(req, res) {
    try {
      const voluntarys = await voluntaryDao.getAll();
      if (voluntarys && voluntarys.length > 0) {
        return Response(res, 200, 'Voluntários encontrados', voluntarys);
      }
      return Response(res, 404, 'Nenhum voluntário encontrado');
    } catch (error) {
      return Response(res, 500, `Erro ao buscar voluntários: ${error}`);
    }
  }
}

export default VoluntaryController;
