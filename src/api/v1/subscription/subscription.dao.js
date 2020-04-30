import mongoose from '../../config/database';

const SubscriptionModel = mongoose.model('Subscription');

export default class SubscriptionDao {
  async get() {
    await SubscriptionModel.find();
  }

  async getByEmail(email) {
    const subscription = await SubscriptionModel.findOne({ email });
    return subscription;
  }

  async post(data) {
    const subscription = new SubscriptionModel(data);
    await subscription.save();
    return subscription;
  }
}
