const mongoose = require("../../database");

const SlideShowModel = mongoose.model("slideshow");

module.exports = {
  async getAll() {
    await SlideShowModel.find({}, {});
  },

  async post(data) {
    const post = await SlideShowModel.create({
      data
    });
    return post;
  }
};
