const slideshow = require("../model/slideshow");
const slideshowRepository = require('../../app/repositories/slideshow')

exports.getPhoto = async (req, res) => {
  try {

    const posts = await slideshowRepository.getAll();
   

    return res.status(200).json(posts);
  } catch (error) {
    res.status(400).send({
      error: `Erro ao realizar busca: ${error}`
    })
  }
};

exports.post = async (req, res) => {
  try {
    const { originalname: name, size, key, location: url = "" } = req.file;
    const { expirationDate, title } = req.body;

    const post = await slideshow.create({
      expirationDate,
      title,
      name,
      size,
      key,
      url
    });

    return res.status(200).json(post);
  } catch (error) {
    res.status(400).send({
      error: 'Failed to change user config' + error
    })
  }

};

exports.delete = async (req, res) => {
  const post = await slideshow.findById(req.params.id);

  await post.remove();

  return res.status(200).send();
};