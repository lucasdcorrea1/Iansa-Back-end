import slideshowDao from './slide.dao';
import validateDate from '../../util/validations/date.validate';
import { buildResponse as Response } from '../../util/responses/base-response';
import * as multer from '../../util/storage/multer.config';

class SlideShowController {
  static async postSlide(req, res) {
    try {
      const { originalname: name, size, key, location: url = '' } = req.file;
      const { expirationDate, title, description } = req.body;

      const slide = await slideshowDao.post({
        title,
        description,
        name,
        size,
        key,
        url,
        expirationDate
      });

      return Response(res, 201, 'Slideshow cadastrado com sucesso.', {
        slide
      });
    } catch (error) {
      return Response(res, 500, `Erro ao cadastrar slideshow: ${error}`);
    }
  }

  static async getSlides(req, res) {
    try {
      const slides = await slideshowDao.getAll();
      const slidesValidos = [];
      if (slides) {
        slides.forEach(item => {
          if (validateDate.compareDate(new Date(), item.expirationDate)) {
            slidesValidos.push(item);
          }
        });
      }
      if (slidesValidos.length > 0) {
        return Response(res, 200, 'Slides encontrados.', slidesValidos);
      }
      return Response(res, 404, 'Slides não encontrados.');
    } catch (error) {
      return Response(res, 500, `Erro ao buscar slideshows: ${error}`);
    }
  }

  static async deleteSlide(req, res) {
    try {
      const slide = await slideshowDao.getById(req.params.id);
      if (slide) {
        await slideshowDao.delete(slide);
        await multer.deleteFile(slide);
        return Response(res, 200, 'Slide deletado com sucesso.');
      }
      return Response(res, 404, 'Slide não encontrado.');
    } catch (error) {
      return Response(res, 500, `Erro ao deletar slide: ${error}`);
    }
  }
}

export default SlideShowController;
