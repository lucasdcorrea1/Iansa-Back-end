import accountabilityDao from './accountability.dao';
import * as multer from '../../services/storage/multer.config';
import { buildResponse as Response } from '../../helpers/response';

class AccountabilityController {
  static async postAccountability(req, res) {
    try {
      const {
        originalname: fileName,
        size: fileSize,
        key,
        location: url = ''
      } = req.file;

      const { title, description, periodStart, periodEnd } = req.body;

      const accountability = await accountabilityDao.post({
        title,
        description,
        periodStart,
        periodEnd,
        fileName,
        fileSize,
        key,
        url
      });

      return Response(res, 201, 'Transparência cadastrada com sucesso', {
        accountability
      });
    } catch (error) {
      return Response(res, 500, `Erro ao cadastrar transparência: ${error}`);
    }
  }

  static async getAccountabilities(req, res) {
    try {
      const accountability = await accountabilityDao.getAll();
      const formatedAccountability = [];

      if (accountability) {
        accountability.forEach(item => {
          formatedAccountability.push({
            id: item.id,
            title: item.title,
            description: item.description,
            periodStart: item.periodStart,
            periodEnd: item.periodEnd,
            url: item.url,
            createdAt: `${item.createdAt.getDate() +
              1}/${item.createdAt.getMonth() +
              1}/${item.createdAt.getFullYear()}`
          });
        });
      }
      if (formatedAccountability.length > 0) {
        return Response(
          res,
          200,
          'Transparências encontradas',
          formatedAccountability
        );
      }
      return Response(res, 404, 'Nenhuma transparência encontrada', null, true);
    } catch (error) {
      return Response(
        res,
        500,
        `Erro ao buscar transparências: ${error}`,
        null,
        true
      );
    }
  }

  static async delete(req, res) {
    try {
      const accountability = await accountabilityDao.getById(req.params.id);
      if (accountability) {
        await accountabilityDao.delete(accountability);
        await multer.deleteFile(accountability);
        return Response(res, 200, 'Transparência deletada com sucesso');
      }
      return Response(res, 404, 'Transparência não encontrada', null, true);
    } catch (error) {
      return Response(
        res,
        500,
        `Erro ao deletar transparência: ${error}`,
        null,
        true
      );
    }
  }
}

export default AccountabilityController;
