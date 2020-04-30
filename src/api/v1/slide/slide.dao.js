import mongoose from '../../config/database';

const SlideShowModel = mongoose.model('slideshow');

export default class SlideShowDao {
  static async get(data) {
    const slide = await SlideShowModel.findOne(data);
    return slide;
  }

  static async getById(id) {
    const slide = await SlideShowModel.findById(id);
    return slide;
  }

  static async getAll() {
    const slides = await SlideShowModel.find();
    return slides;
  }

  static async post(data) {
    const slide = await SlideShowModel.create(data);
    return slide;
  }

  static async delete(slide) {
    await SlideShowModel.deleteOne(slide);
  }
}
