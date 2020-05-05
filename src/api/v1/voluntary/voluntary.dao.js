import mongoose from '../../config/database';

const VoluntaryModel = mongoose.model('Voluntary');

export default class SubscriptionDao {
  static async post(data) {
    const voluntary = await VoluntaryModel.create(data);
    return voluntary;
  }

  static async getAll() {
    try {
      const voluntaries = await VoluntaryModel.find();
      return voluntaries;
    } catch (error) {
      return null;
    }
  }

  static async getByUserId(userId) {
    try {
      const voluntary = await VoluntaryModel.findOne({ userId });
      return voluntary;
    } catch (error) {
      return null;
    }
  }
}
