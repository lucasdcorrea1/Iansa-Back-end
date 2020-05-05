import mongoose from '../../config/database';

const AccountabilityModel = mongoose.model('Accountability');

export default class AccountabilityDao {
  static async getById(id) {
    try {
      const slide = await AccountabilityModel.findById(id);
      return slide;
    } catch (error) {
      return null;
    }
  }

  static async getAll() {
    try {
      const slides = await AccountabilityModel.find();
      return slides;
    } catch (error) {
      return null;
    }
  }

  static async post(data) {
    const slide = await AccountabilityModel.create(data);
    return slide;
  }

  static async delete(slide) {
    await AccountabilityModel.deleteOne(slide);
  }
}
