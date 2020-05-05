import mongoose from '../../config/database';

const SlideModel = mongoose.model('Slide');

export default class SlideDao {
  static async getById(id) {
    try {
      const slide = await SlideModel.findById(id);
      return slide;
    } catch (error) {
      return null;
    }
  }

  static async getAll() {
    try {
      const slides = await SlideModel.find();
      return slides;
    } catch (error) {
      return null;
    }
  }

  static async post(data) {
    const slide = await SlideModel.create(data);
    return slide;
  }

  static async delete(slide) {
    await SlideModel.deleteOne(slide);
  }
}
