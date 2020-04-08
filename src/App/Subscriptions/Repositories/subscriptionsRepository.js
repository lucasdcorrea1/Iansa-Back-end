'use strict';
const mongoose = require('../../../Database');
const subscriptionsModel = mongoose.model('Subscriptions');

exports.get = async () => {
    return await subscriptionsModel.find();
};

exports.getByEmail = async (data) => {
    const subscriptions = await subscriptionsModel.find(data);

    return subscriptions;
};

exports.post = async (data) => {
    const subscriptions = new subscriptionsModel(data);
    await subscriptions.save();

    return subscriptions;
};
