import mongoose from "../../config/database";

const UserModel = mongoose.model("User");

export default class CardDao {
  async get(data) {
    const user = await UserModel.findOne(data);
    return user;
  }

  async getUserAuth(data) {
    await UserModel.findOne(data).select("+password");
  }

  async getUserReset(data) {
    await UserModel.findOne(data).select(
      "+password passwordResetToken passwordResetExpires"
    );
  }

  async post(data) {
    const user = new UserModel(data);
    await user.save();

    return user.id;
  }

  async put(id, data) {
    const user = await UserModel.findByIdAndUpdate(id, data);
    return user;
  }

  async asyncputPasswrd(user, password) {
    user.password = password;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    await user.save();
    return user;
  }
}
