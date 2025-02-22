const postModel = require("../model/postModel");
const userModel = require("../model/userModel");

exports.getPosts = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 3;
  const skip = (page - 1) * limit;
  const totalPosts = await postModel.countDocuments({});
  const post = await postModel
    .find({})
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 })
    .populate("likes", "-password");
  res
    .status(200)
    .json({ length: totalPosts, message: "post retrieved", data: post });
};

exports.searchPost = async (req, res) => {
  const result = req.query.result
    ? {
        title: { $regex: req.query.result, $options: "i" },
      }
    : null;
  const post = await postModel.find(result);

  res.status(200).json({ message: "searched result", data: post });
};
exports.getSinglePost = async (req, res) => {
  const post = await postModel
    .findById(req.params.id)
    .populate("author")
    .populate({
      path: "comments",
      populate: {
        path: "commentedBy",
        select: "name _id createdAt",
      },
    });
  if (!post) return res.status(404).json({ message: "post not found" });

  res.status(200).json({ message: "post retrieved", data: post });
};
exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "no file provided" });
  }
  const post = await postModel.create({
    title,
    content,
    author: req.user,
    avatar: req.file.path,
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
exports.likePost = async (req, res) => {
  const userLiking = await userModel.findById(req.user);
  if (!userLiking) {
    throw new BadReq("error ocurred.");
  }
  const postToLike = await postModel.findById(req.params.id);
  postToLike.liked = !postToLike.liked;

  if (postToLike.likes.includes(userLiking._id)) {
    postToLike.likes = postToLike.likes.filter(
      (id) => id.toString() !== userLiking._id.toString()
    );
    await postToLike.save();
    return res.status(200).json({
      postToLike,
    });
  }
  postToLike.likes.push(userLiking._id);
  await postToLike.save();
  res.status(200).json({
    postToLike,
  });
};
