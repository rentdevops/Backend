const mongoose = require("mongoose");

const CommentModel = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommentReply",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comment", CommentModel);
