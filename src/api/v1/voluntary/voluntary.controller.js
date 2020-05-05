import userDao from '../user/user.dao';
import voluntaryDao from './voluntary.dao';
import emailService from '../../services/email/email.service';
import emailMessageTypes from '../../services/email/email.types';
import { buildResponse as Response } from '../../helpers/response';

const voluntaryStatus = {
  SUBSCRIBED: 'SUBSCRIBED',
  ACCEPTED: 'ACCEPTED',
  DENIED: 'DENIED',
  AT_WORK: 'AT_WORK',
  UNSUBSCRIBED: 'UNSUBSCRIBED'
};

class VoluntaryController {
  static async postVoluntary(req, res) {
    try {
      const userId = req.userId;
      const fullName = req.body.fullName.trim();
      const cpf = req.body.cpf;
      const zipCode = req.body.zipCode.trim();
      const address = req.body.address.trim();
      const addressNumber = req.body.addressNumber.trim();
      const city = req.body.city.trim();
      const state = req.body.state.trim();
      const birthDate = req.body.birthDate;
      const gender = req.body.gender.trim();
      const bloodType = req.body.bloodType.trim();
      const mainActivity = req.body.mainActivity.trim();
      const description = req.body.description.trim();

      const user = await userDao.getById(userId);

      if (await voluntaryDao.getByUserId(userId)) {
        return Response(res, 409, 'Voluntário já inscrito');
      }

      const voluntary = await voluntaryDao.post({
        userId: user.id,
        status: voluntaryStatus.SUBSCRIBED,
        fullName,
        cpf,
        zipCode,
        address,
        addressNumber,
        city,
        state,
        birthDate,
        gender,
        bloodType,
        mainActivity,
        description
      });

      const voluntaryStatusLink = 'https://google.com';
      await emailService.sendMail(
        user.email,
        emailMessageTypes.VOLUNTARY,
        user.name,
        voluntaryStatusLink
      );
      return Response(
        res,
        201,
        `Voluntário ${fullName} inscrito com sucesso`,
        voluntary
      );
    } catch (error) {
      return Response(res, 500, `Erro ao cadastrar voluntário: ${error}`);
    }
  }

  static async getVoluntaries(req, res) {
    try {
      const voluntaries = await voluntaryDao.getAll();
      if (voluntaries && voluntaries.length > 0) {
        return Response(res, 200, 'Voluntários encontrados', voluntaries);
      }
      return Response(res, 404, 'Nenhum voluntário encontrado', null, true);
    } catch (error) {
      return Response(
        res,
        500,
        `Erro ao buscar voluntários: ${error}`,
        null,
        true
      );
    }
  }
}

export default VoluntaryController;
