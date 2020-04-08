'use strict';
const mongoose = require('../../../Database');
const subscriptionsModel = mongoose.model('Subscriptions');

exports.get = async () => {
    return await subscriptionsModel.find();
};

exports.getByEmail = async (email) => {
    const subscriptions = await subscriptionsModel.findOne({email});

    return subscriptions;
};

exports.post = async (data) => {
    const subscriptions = new subscriptionsModel(data);
    await subscriptions.save();

    return subscriptions;
};
