const mongoose = require("../../database");

const JobModel = mongoose.model("Job");

module.exports = {
  async get() {
    await JobModel.find();
  },

  async post(data) {
    const post = new JobModel(data);
    await post.save();

    return post;
  }
};
