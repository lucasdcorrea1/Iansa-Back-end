const mongoose = require("../../database");

const UserModel = mongoose.model("User");

exports.get = async data => {
  const user = await UserModel.findOne(data);
  return user;
};

exports.getUserAuth = async data => {
  await UserModel.findOne(data).select("+password");
};

exports.getUserReset = async data => {
  await UserModel.findOne(data).select(
    "+password passwordResetToken passwordResetExpires"
  );
};

exports.post = async data => {
  const user = new UserModel(data);
  await user.save();

  return user.id;
};

exports.put = async (id, data) => {
  const user = await UserModel.findByIdAndUpdate(id, data);
  return user;
};

exports.putPasswrd = async (user, password) => {
  user.password = password;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save();
  return user;
};
