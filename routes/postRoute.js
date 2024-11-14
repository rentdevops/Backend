const express = require("express");
const {
  getPosts,
  createPost,
  getSinglePost,
  editPost,
  deletePost,
} = require("../ctrl/postCtrl");
const Auth = require("../middleware/Auth");
const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.post("/createpost", Auth, createPost);
router.put("/editpost/:id", Auth, editPost);
router.delete("/deletepost/:id", Auth, deletePost);

module.exports = router;
