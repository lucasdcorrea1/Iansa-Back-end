import mongoose from "../../config/database";

const slideshow = mongoose.model("transparency");

export default class TransparencyDao {
  async getAll() {
    await slideshow.find({}, {});
  }

  async post(data) {
    const test = await slideshow.create({
      data
    });
    return test;
  }
}
