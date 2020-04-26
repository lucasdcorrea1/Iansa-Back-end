import transparencyModel from "./transparency.model";
import transparencyRepository from "./transparency.dao";

class TransparencyController {
  static async create(req, res) {
    try {
      const { originalname: name, size, key, location: url = "" } = req.file;
      const { title, description } = req.body;

      const post = await transparencyModel.create({
        title,
        description,
        name,
        size,
        key,
        url
      });

      return res.status(200).send(JSON.stringify(post));
    } catch (error) {
      res.status(400).send({
        error: `Falha ao cadastrar novo post. ${error}`
      });
    }
    return res.status(500).send(JSON.stringify("Erro ao cadastrar novo post"));
  }

  static async index(req, res) {
    try {
      const posts = await transparencyRepository.getAll();
      const formatedPost = [];

      if (posts) {
        posts.forEach(item => {
          formatedPost.push({
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

      return res.status(200).json(formatedPost);
    } catch (error) {
      res.status(400).send({
        error: `Erro ao realizar busca - ${error}`
      });
    }
    return res.status(500).send(JSON.stringify("Erro ao realizar busca"));
  }

  static async delete(req, res) {
    const post = await transparencyModel.findById(req.params.id);
    await post.remove();

    return res.status(201).json({ message: "Slideshow deletado" });
  }
}

export default TransparencyController;
