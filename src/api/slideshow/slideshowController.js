'use strict'
const slideshowModel = require('../../models/slideshow');
const slideshowRepository = require('./slideshowRepository');
const validateDate = require('../../util/validations/validateDate');

module.exports = {
  async create(req, res) {
    try {
      const { originalname: name, size, key, location: url = "" } = req.file;
      const { expirationDate, title, description, } = req.body;

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
      })
    };
  },

  async index(req, res) {
    try {
      const posts = await slideshowRepository.getAll();
      var postsValidados = []

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
    };
  },

  async delete(req, res) {
    const post = await slideshow.findById(req.params.id);
    await post.remove()
    return res.status(201).json({ message: 'Slideshow deletado' });
  },

};
