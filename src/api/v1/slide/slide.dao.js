import mongoose from '../../config/database';

const SlideModel = mongoose.model('Slide');

export default class SlideDao {
  static async get(data) {
    const slide = await SlideModel.findOne(data);
    return slide;
  }

  static async getById(id) {
    const slide = await SlideModel.findById(id);
    return slide;
  }

  static async getAll() {
    const slides = await SlideModel.find();
    return slides;
  }

  static async post(data) {
    const slide = await SlideModel.create(data);
    return slide;
  }

  static async delete(slide) {
    await SlideModel.deleteOne(slide);
  }
}
