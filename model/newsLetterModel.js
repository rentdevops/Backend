const mongoose = require("mongoose");

const NewsLetter = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("UserNewsLetter", NewsLetter);
