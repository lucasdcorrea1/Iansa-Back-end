const transparencyModel = require("../../Model/transparency");
const transparencyRepository = require('../../Repositories/transparency')

module.exports = {
  async getImage(req, res) {
    try {
      const posts = await transparencyRepository.getAll();
      var formatedPost = []

      if(posts){
        posts.forEach(item => {
          formatedPost.push({
            _id: item._id,
            title: item.title,
            url: item.url,
            description: item.description,
            name: item.name,
            createdAt: `${item.createdAt.getDate()+1}/${item.createdAt.getMonth()+1}/${item.createdAt.getFullYear()}`
          });
        });
      };
      
      return res.status(200).json(formatedPost);
    } catch (error) {
      res.status(400).send({
        error: `Erro ao realizar busca: ${error}`
      });
    };
  },

  async post(req, res) {
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
      })
    };
  },

  async delete(req, res) {
    const post = await transparency.findById(req.params.id);
    return res.status(200).send(await post.remove());
  },

};
