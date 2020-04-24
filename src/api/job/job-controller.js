const jobsRepository = require('./job-repository')

module.exports = {
  async create(req, res) {
    try {
      const { originalname: nameFile, size, key, location: url = "" } = req.file;
      const { name, email, message } = req.body;

      const postData = {
        name,
        email,
        message,
        nameFile,
        size,
        key,
        url
      };

      const post = await jobsRepository.post(postData);

      return res.json(post);
    } catch (error) {
      res.status(400).json({
        error: `Falha ao cadastrar job - ${error}`
      })
    };
  },

  async index(req, res) {
    
    return res.json({ message: 'Get jobs' });
  },

  async delete(req, res) {
    const post = await transparency.findById(req.params.id);
    await post.remove()

    return res.status(201).json({ message: 'Slideshow deletado' });
  }

};
