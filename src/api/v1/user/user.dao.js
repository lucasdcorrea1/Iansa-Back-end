import mongoose from "../../config/database";

const UserModel = mongoose.model("User");

export default class CardDao {
  static async get(data) {
    const user = await UserModel.findOne(data);
    return user;
  }

  static async getUserAuth(data) {
    await UserModel.findOne(data).select("+password");
  }

  static async getUserReset(data) {
    await UserModel.findOne(data).select(
      "+password passwordResetToken passwordResetExpires"
    );
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

  static async asyncputPasswrd(user, password) {
    user.password = password;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    await user.save();
    return user;
  }
}
