const mongoose = require("../../database");

const SubscriptionModel = mongoose.model("Subscription");

exports.get = async () => {
  await SubscriptionModel.find();
};

exports.getByEmail = async email => {
  const subscription = await SubscriptionModel.findOne({ email });

  return subscription;
};

exports.post = async data => {
  const subscription = new SubscriptionModel(data);
  await subscription.save();

  return subscription;
};
