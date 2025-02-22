const commentModel = require("../model/commentModel");
const postModel = require("../model/postModel");
const replyCommentModel = require("../model/replyCommentModel");

exports.getCommentReply = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Invalid reply id" });
  }
  const replies = await replyCommentModel
    .find({ commentId: id })
    .populate("replyBy", " createdAt name");
  res.status(200).json({
    message: replies,
  });
};
exports.replyComment = async (req, res) => {
  const { reply } = req.body;

  if (!req.params.id) {
    return res.status(400).json({ message: "Invalid comment id" });
  }
  if (!reply) {
    return res.status(400).json({ message: "reply content empty" });
  }
  const Reply = await replyCommentModel.create({
    reply,
    replyBy: req.user,
    commentId: req.params.id,
  });
  const comment = await commentModel.findById(req.params.id);
  let updateComment = comment.replies.push(Reply._id);

  await Reply.populate("replyBy", "name");
  await comment.save();

  res.status(201).json({
    message: "Reply created successfully",

    data: Reply,
  });
};
