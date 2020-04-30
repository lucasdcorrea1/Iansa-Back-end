import mongoose from "../../config/database";

const UserModel = mongoose.model("User");

export default class UserDao {
  static async get(data) {
    const user = await UserModel.findOne(data);
    return user;
  }

  static async post(data) {
    const user = new UserModel(data);
    await user.save();
    return user;
  }

  static async put(id, data) {
    const user = await UserModel.findByIdAndUpdate(id, data);
    return user;
  }
}
