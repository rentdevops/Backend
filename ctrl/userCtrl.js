const BadReq = require("../error_ctrl/BadReq");
const userModel = require("../model/userModel");
const main = require("../utils/forgetPasswdEmail");
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
exports.getUser = async (req, res) => {
  const user = await userModel.findById(req.user).select("-password");
  if (!user) {
    throw new BadReq("user not found");
  }
  res.status(200).json({
    message: "users retrieved",
    data: user,
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
  });
  const webToken = token(user._id);
  res.status(200).json({
    message: "user created",
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
    token: webToken,
  });
};
exports.blockeUser = async (req, res) => {
  const userToBlock = await userModel.findById(req.params.id);
  if (!userToBlock) {
    throw new BadReq("there no such user.");
  }
  const userBlocking = await userModel.findById(req.user);
  if (!userBlocking) {
    throw new BadReq("error ocurred.");
  }

  if (userBlocking.blockUsers.includes(userToBlock._id)) {
    throw new BadReq("you already blocked this user.");
  }
  userBlocking.blockUsers.push(userToBlock._id);
  await userBlocking.save();
  res.status(200).json({
    message: `you have successfully blocked ${userToBlock.name} `,
  });
};
exports.unblockeUser = async (req, res) => {
  const userTounBlock = await userModel.findById(req.body.id);
  if (!userTounBlock) {
    throw new BadReq("there no such user.");
  }
  const userUnBlocking = await userModel.findById(req.user);
  if (!userUnBlocking) {
    throw new BadReq("error ocurred.");
  }

  if (userUnBlocking.blockUsers.includes(userTounBlock._id)) {
    userUnBlocking.blockUsers = userUnBlocking.blockUsers.filter(
      (id) => id.toString() !== userTounBlock._id.toString()
    );
    await userUnBlocking.save();
  } else {
    throw new BadReq("you haven't blocked this user.");
  }
  res.status(200).json({
    message: `you have successfully blocked ${userTounBlock.name} `,
  });
};

exports.uploadProfilePicture = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: "No file uploaded." });
  }
  const user = await userModel.findById(req.user);
  if (!user) {
    throw new BadRequest("invalid user...");
  }
  const upload = await userModel.findByIdAndUpdate(
    req.user,
    { profilePicture: req.file.path },
    { new: true }
  );
  upload.save();
  console.log(req.file);
  res.status(200).json({ message: "uploaded" });
};

exports.sendEmail = async (req, res) => {
  const { email, otp } = req.body;
  if (!email) {
    throw new BadReq("provide an email for password recovery");
  }
  // const user = await userModel.findOne({ email });
  // if (!user) {
  //   throw new BadReq("this email does not exist");
  // }

  await main(email, otp);
  res.status(200).json({ message: "email sent" });
};

exports.resetPasswd = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new BadReq("provide an email for password recovery");
  }
  const resetPass = await userModel.findOneAndUpdate(
    { email },
    {
      password: await hashPassword(password),
    },
    { new: true }
  );
  res
    .status(200)
    .json({ message: "Congratulation you have changed your password" });
};
