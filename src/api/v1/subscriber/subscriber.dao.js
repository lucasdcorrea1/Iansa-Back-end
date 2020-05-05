import mongoose from '../../config/database';

const SubscriberModel = mongoose.model('Subscriber');

export default class SubscriptionDao {
  static async post(data) {
    const subscriber = await SubscriberModel.create(data);
    return subscriber;
  }

  static async getAll() {
    try {
      const subscribers = await SubscriberModel.find();
      return subscribers;
    } catch (error) {
      return null;
    }
  }

  static async getByEmail(email) {
    try {
      const subscriber = await SubscriberModel.findOne({ email });
      return subscriber;
    } catch (error) {
      return null;
    }
  }
}
