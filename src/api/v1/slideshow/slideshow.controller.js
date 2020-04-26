import slideshowModel from "./slideshow.model";
import slideshowRepository from "./slideshow.dao";
import validateDate from "../../util/validations/date.validate";

class SlideShowController {
  static async create(req, res) {
    try {
      const { originalname: name, size, key, location: url = "" } = req.file;
      const { expirationDate, title, description } = req.body;

      const post = await slideshowModel.create({
        expirationDate,
        title,
        description,
        name,
        size,
        key,
        url
      });

      return res.json(post);
    } catch (error) {
      res.status(400).json({
        error: `Falha ao cadastrar novo post. ${error}`
      });
    }
    return res.status(500).send(JSON.stringify("Erro ao criar post"));
  }

  static async index(req, res) {
    try {
      const posts = await slideshowRepository.getAll();
      const postsValidados = [];

      if (posts) {
        const dateNow = new Date();

        posts.forEach(item => {
          if (validateDate.compareDate(dateNow, item.expirationDate)) {
            postsValidados.push(item);
          }
        });
      }
      return res.json(postsValidados);
    } catch (error) {
      res.status(400).json({
        error: `Erro ao realizar busca - ${error}`
      });
    }
    return res.status(500).send(JSON.stringify("Erro ao realizar busca"));
  }

  static async delete(req, res) {
    const post = await slideshowModel.findById(req.params.id);
    await post.remove();
    return res.status(201).json({ message: "Slideshow deletado" });
  }
}

export default SlideShowController;
