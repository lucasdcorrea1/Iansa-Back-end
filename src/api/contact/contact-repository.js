const mongoose = require("../../database");

const ContactModel = mongoose.model("Contact");

exports.get = async () => {
  await ContactModel.find();
};

exports.getByEmail = async email => {
  await ContactModel.findOne({ email });
};

exports.post = async data => {
  const contact = new ContactModel(data);
  await contact.save();

  return contact;
};
