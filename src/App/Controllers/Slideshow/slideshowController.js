'use strict'
const slideshowModel = require("../../Model/slideshow");
const slideshowRepository = require('../../Repositories/slideshow');
const validateDate = require('../../Validations/validateDate');

module.exports = {
  async getImage(req, res) {
    try {
      const posts = await slideshowRepository.getAll();
      var postsValidados = []
      
      if (posts) {
        const dateNow = new Date();

        posts.forEach(item => {
          
          if(validateDate.compareDate(dateNow, item.expirationDate)){
            postsValidados.push(item);
          }
        });
      }
      return res.status(200).json(postsValidados);
    } catch (error) {
      res.status(400).send({
        error: `Erro ao realizar busca: ${error}`
      });
    };
  },

  async post(req, res) {
    try {
      const { originalname: name, size, key, location: url = "" } = req.file;
      const { expirationDate, title, description,  } = req.body;
      
      const post = await slideshowModel.create({
        expirationDate,
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
    const post = await slideshow.findById(req.params.id);
    return res.status(200).send(await post.remove());
  },

};
