const mongoose = require("../../database");

const ContactModel = mongoose.model("Contact");

exports.post = async data => {
  const contact = new ContactModel(data);
  await contact.save();
  return contact;
};
