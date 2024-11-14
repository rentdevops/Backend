const postModel = require("../model/postModel");

exports.getPosts = async (req, res) => {
  const post = await postModel.find({});
  res
    .status(200)
    .json({ length: post.length, message: "post retrieved", data: post });
};
exports.getSinglePost = async (req, res) => {
  const post = await postModel.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "post not found" });

  res.status(200).json({ message: "post retrieved", data: post });
};
exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;
  const post = await postModel.create({
    title,
    content,
    author: req.user,
  });

  res.status(201).json({
    message: "post created",
    data: post,
  });
};
exports.editPost = async (req, res) => {
  const postOwner = await postModel.findById(req.params.id);

  if (parseInt(req.user) !== parseInt(postOwner.author)) {
    return res
      .status(403)
      .json({ message: "Forbidden: You cannot edit this post" });
  }
  const post = await postModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!post) return res.status(404).json({ message: "post not found" });

  res.status(200).json({ message: "post updated", data: "post" });
};
exports.deletePost = async (req, res) => {
  const postOwner = await postModel.findById(req.params.id);
  if (parseInt(req.user) !== parseInt(postOwner.author)) {
    return res
      .status(403)
      .json({ message: "Forbidden: You cannot delete this post" });
  }
  const post = await postModel.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ message: "post not found" });
  res.status(200).json({ message: "post deleted", data: "deleted" });
};
