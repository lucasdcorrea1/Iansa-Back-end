const transparencyModel = require("../../Model/transparency");
const transparencyRepository = require('../../Repositories/transparency')

module.exports = {
  async getImage(req, res) {
    try {
      const posts = await transparencyRepository.getAll();

      return res.status(200).json(posts);
    } catch (error) {
      res.status(400).send({
        error: `Erro ao realizar busca: ${error}`
      });
    };
  },

  async post(req, res) {
    try {
      const { originalname: name, size, key, location: url = "" } = req.file;
      const { expirationDate, title } = req.body;

      const post = await transparencyModel.create({
        expirationDate,
        title,
        name,
        size,
        key,
        url
      });
      
      return res.status(200).send(JSON.stringify(post));
    } catch (error) {
      res.status(400).send({
        error: `Falha ao cadastrar novo post. ${error}`
      })
    };
  },

  async delete(req, res) {
    const post = await transparency.findById(req.params.id);
    return res.status(200).send(await post.remove());
  },

};
