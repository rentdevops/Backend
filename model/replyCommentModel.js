const mongoose = require("mongoose");

const CommentReplyModel = new mongoose.Schema(
  {
    reply: {
      type: String,
      required: true,
    },

    replyBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("CommentReply", CommentReplyModel);
