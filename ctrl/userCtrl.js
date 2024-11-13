const BadReq = require("../error_ctrl/BadReq");
const userModel = require("../model/userModel");
const hashPassword = require("../utils/hashPasswd");
const token = require("../utils/jwt");
const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
  const users = await userModel.find({});
  res.status(200).json({
    length: users.length,
    message: "users retrieved",
    data: users,
  });
};

exports.CreateUser = async (req, res) => {
  const { name, email, password, bio, gender } = req.body;
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    throw new BadReq("the email already exist");
  }

  const user = await userModel.create({
    name,
    email,
    password: await hashPassword(password),
    bio,
    gender,
  });
  const webToken = token(user._id);
  res.status(200).json({
    message: "user created",
    data: user,
    token: webToken,
  });
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadReq("provide email and password");
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new BadReq("invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadReq("invalid password");
  }
  const webToken = token(user._id);
  res.status(200).json({
    message: "user logged in",
    data: user,
    token: webToken,
  });
};
