import mongoose from '../../config/database';

const SubscriberModel = mongoose.model('Subscriber');

export default class SubscriptionDao {
  static async post(data) {
    const subscriber = await SubscriberModel.create(data);
    return subscriber;
  }

  static async getAll() {
    const subscribers = await SubscriberModel.find();
    return subscribers;
  }

  static async getByEmail(email) {
    const subscriber = await SubscriberModel.findOne({ email });
    return subscriber;
  }
}
