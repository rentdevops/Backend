const mongoose = require("mongoose");

const PostModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    tags: [String],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    views: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", PostModel);
