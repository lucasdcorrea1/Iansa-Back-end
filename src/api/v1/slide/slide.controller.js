import slideDao from './slide.dao';
import validateDate from '../../helpers/date';
import * as multer from '../../services/storage/multer.config';
import { buildResponse as Response } from '../../helpers/response';

class SlideShowController {
  static async postSlide(req, res) {
    try {
      const { originalname: name, size, key, location: url = '' } = req.file;
      const { expirationDate, title, description } = req.body;

      const slide = await slideDao.post({
        title,
        description,
        name,
        size,
        key,
        url,
        expirationDate
      });

      return Response(res, 201, 'Slideshow cadastrado com sucesso', {
        slide
      });
    } catch (error) {
      return Response(res, 500, `Erro ao cadastrar slide: ${error}`);
    }
  }

  static async getSlides(req, res) {
    try {
      const slides = await slideDao.getAll();
      const validSlides = [];
      if (slides) {
        slides.forEach(item => {
          if (validateDate.compareDate(new Date(), item.expirationDate)) {
            validSlides.push(item);
          }
        });
      }
      if (validSlides.length > 0) {
        return Response(res, 200, 'Slides encontrados', validSlides);
      }
      return Response(res, 404, 'Nenhum slide encontrado', null, true);
    } catch (error) {
      return Response(res, 500, `Erro ao buscar slides: ${error}`, null, true);
    }
  }

  static async deleteSlide(req, res) {
    try {
      const slide = await slideDao.getById(req.params.id);
      if (slide) {
        await slideDao.delete(slide);
        await multer.deleteFile(slide);
        return Response(res, 200, 'Slide deletado com sucesso');
      }
      return Response(res, 404, 'Slide não encontrado', null, true);
    } catch (error) {
      return Response(res, 500, `Erro ao deletar slide: ${error}`, null, true);
    }
  }
}

export default SlideShowController;
