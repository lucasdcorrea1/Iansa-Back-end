'use strict';
const mongoose = require('../../database');
const userModel = mongoose.model('User');

exports.get = async (data) => {
    const user = await userModel.findOne(data);

    return user;
};

exports.getUserAuth = async (data) => {
    return await userModel.findOne(data).select('+password');
};

exports.getUserReset = async (data) => {
    return await userModel.findOne(data).select('+password passwordResetToken passwordResetExpires');
};

exports.post = async (data) => {
    const user = new userModel(data);
    await user.save();

    return user.id
};

exports.put = async (id, data) => {
    const user = await userModel.findByIdAndUpdate(id, data);

    return user;
};

exports.putPasswrd = async (user,password) => {
    user.password = password;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    await user.save();

    return user;
};