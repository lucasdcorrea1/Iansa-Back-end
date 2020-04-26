import mongoose from "../../config/database";

const ContactModel = mongoose.model("Contact");

export default class ContactDao {
  static async post(data) {
    const contact = new ContactModel(data);
    await contact.save();
    return contact;
  }
}
