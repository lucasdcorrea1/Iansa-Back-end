import mongoose from "../../config/database";

const slideshow = mongoose.model("accountability");

export default class AccountabilityDao {
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
