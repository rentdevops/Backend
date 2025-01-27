const express = require("express");
const {
  postComment,
  editComment,
  deleteComment,
  getComments,
  getSingleComment,
} = require("../ctrl/commentCtrl");
const Auth = require("../middleware/Auth");
const router = express.Router();

router.get("/singleComment/:id", getSingleComment);
router.get("/:id", getComments);
router.post("/:id", Auth, postComment);
router.patch("/edit_comment/:id/:commentId", Auth, editComment);
router.delete("/delete_comment/:id", Auth, deleteComment);

module.exports = router;
