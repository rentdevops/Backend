const commentModel = require("../model/commentModel");
const postModel = require("../model/postModel");

exports.getComments = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Invalid post id" });
  }
  const comments = await commentModel
    .find({ postId: id })
    .populate("replies")
    .populate("commentedBy")
    .sort({ createdAt: -1 });
  res.status(200).json({
    message: comments,
  });
};
exports.getSingleComment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Invalid comment id" });
  }
  const comment = await commentModel
    .findById(id)
    .populate("replies")
    .populate("commentedBy", "name");
  res.status(200).json({
    message: comment,
  });
};
exports.postComment = async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Invalid post id" });
  }
  if (!content) {
    return res.status(400).json({ message: "comment content empty" });
  }
  const comment = await commentModel.create({
    content,
    commentedBy: req.user,
    postId: id,
  });
  const post = await postModel.findById(id);
  let updatePost = post.comments.push(comment._id);

  await post.save();
  await comment.populate("commentedBy");

  res.status(201).json({
    message: comment,
  });
};
exports.editComment = async (req, res) => {
  const { id, commentId } = req.params;
  const commentOwner = await commentModel.findById(commentId);
  const { content } = req.body;

  if (parseInt(req.user) !== parseInt(commentOwner.commentedBy)) {
    return res
      .status(403)
      .json({ message: "Forbidden: You cannot edit this post" });
  }
  if (!id) {
    return res.status(400).json({ message: "Invalid post id" });
  }
  if (!content) {
    return res.status(400).json({ message: "comment content empty" });
  }
  const comment = await commentModel.findByIdAndUpdate(
    commentId,
    { content },
    {
      new: true,
    }
  );

  res.status(201).json({
    message: "comment updated",
  });
};
exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Invalid post id" });
  }
  const commentOwner = await commentModel.findById(id);
  if (!commentOwner) {
    return res.status(400).json({ message: "Invalid comment owner" });
  }
  const post = await postModel.findById(commentOwner.postId);
  if (!post) {
    return res.status(400).json({ message: "Invalid post" });
  }
  if (parseInt(req.user) !== parseInt(commentOwner.commentedBy)) {
    return res
      .status(403)
      .json({ message: "Forbidden: You cannot delete this comment" });
  }
  post.comments = post.comments.filter(
    (comment) => parseInt(id) !== parseInt(comment)
  );
  await post.save();

  const comment = await commentModel.findByIdAndDelete(id);

  res.status(201).json({
    message: "comment deleted",
  });
};
