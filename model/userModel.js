const mongoose = require("mongoose");

const UserModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    blockUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    profilePicture: {
      type: String,
      default:
        "https://gravatar.com/avatar/d95fb681b055b4a99a0b4c8c2680ac19?s=400&d=mp&r=x",
    },
    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserModel);
