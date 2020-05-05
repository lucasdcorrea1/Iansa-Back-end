import accountabilityDao from './accountability.dao';
import * as multer from '../../util/storage/multer.config';
import { buildResponse as Response } from '../../util/responses/base-response';

class AccountabilityController {
  static async postAccountability(req, res) {
    try {
      const { originalname: name, size, key, location: url = '' } = req.file;
      const { expirationDate, title, description } = req.body;

      const accountability = await accountabilityDao.post({
        title,
        description,
        name,
        size,
        key,
        url,
        expirationDate
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
            url: item.url,
            description: item.description,
            name: item.name,
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
      return Response(res, 404, 'Nenhuma transparência encontrada');
    } catch (error) {
      return Response(res, 500, `Erro ao buscar transparências: ${error}`);
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
      return Response(res, 404, 'Transparência não encontrada');
    } catch (error) {
      return Response(res, 500, `Erro ao deletar transparência: ${error}`);
    }
  }
}

export default AccountabilityController;
