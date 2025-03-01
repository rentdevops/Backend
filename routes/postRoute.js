const express = require("express");
const {
  getPosts,
  createPost,
  getSinglePost,
  editPost,
  deletePost,
  likePost,
  searchPost,
} = require("../ctrl/postCtrl");
const Auth = require("../middleware/Auth");
const multer = require("multer");
const { postStorage } = require("../utils/cloudinaryConfig");
const router = express.Router();
const upload = multer({ storage: postStorage });
router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.post("/createpost", Auth, upload.single("profile"), createPost);
router.put("/editpost/:id", Auth, editPost);
router.delete("/deletepost/:id", Auth, deletePost);
router.patch("/likepost/:id", Auth, likePost);
router.get("/search/post", searchPost);

module.exports = router;
