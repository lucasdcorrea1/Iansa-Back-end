'use strict';
const mongoose = require('../../../Database');
const subscriptionModel = mongoose.model('Subscription');

exports.get = async () => {
    return await subscriptionModel.find();
};

exports.getByEmail = async (email) => {
    const subscription = await subscriptionModel.findOne({email});

    return subscription;
};

exports.post = async (data) => {
    const subscription = new subscriptionModel(data);
    await subscription.save();

    return subscription;
};
