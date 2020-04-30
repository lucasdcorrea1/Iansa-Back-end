import mongoose from '../../config/database';

const MessageModel = mongoose.model('Message');

export default class MessageDao {
  static async post(data) {
    const message = new MessageModel(data);
    await message.save();
    return message;
  }
}
