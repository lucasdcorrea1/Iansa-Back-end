'use strict';
const mongoose = require('../../database');
const contactModel = mongoose.model('Contact');

exports.get = async () => {
  return await contactModel.find();
};

exports.getByEmail = async (email) => {
  return await contactModel.findOne({ email })
};

exports.post = async (data) => {
  const contact = new contactModel(data);
  await contact.save();

  return contact;
};
