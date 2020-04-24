const mongoose = require("../../database");

const slideshow = mongoose.model("transparency");

module.exports = {
  async getAll() {
    await slideshow.find({}, {});
  },

  async post(data) {
    const test = await slideshow.create({
      data
    });
    return test;
  }
};
