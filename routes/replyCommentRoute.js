const express = require("express");
const Auth = require("../middleware/Auth");
const { replyComment, getCommentReply } = require("../ctrl/replyCommentCtrl");
const router = express.Router();

router.post("/:id", Auth, replyComment);
router.get("/:id", Auth, getCommentReply);

module.exports = router;
