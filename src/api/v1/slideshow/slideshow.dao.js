import mongoose from "../../config/database";

const SlideShowModel = mongoose.model("slideshow");

export default class SlideShowDao {
  static async getAll() {
    await SlideShowModel.find({}, {});
  }

  static async post(data) {
    const post = await SlideShowModel.create({
      data
    });
    return post;
  }
}
