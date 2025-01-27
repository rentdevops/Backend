const express = require("express");
const multer = require("multer");
const { storage } = require("../utils/cloudinaryConfig");
const {
  getUsers,
  CreateUser,
  Login,
  blockeUser,
  unblockeUser,
  uploadProfilePicture,
  getUser,
  sendEmail,
  resetPasswd,
} = require("../ctrl/userCtrl");
const Auth = require("../middleware/Auth");
const { searchPost } = require("../ctrl/postCtrl");

const router = express.Router();
const upload = multer({ storage });

router.get("/", getUsers);
router.get("/user", Auth, getUser);
router.post("/create_account", CreateUser);
router.post("/login", Login);
router.get("/block_user/:id", Auth, blockeUser);
router.post("/unblock_user", Auth, unblockeUser);
router.patch("/updatePassword", resetPasswd);
router.post("/email", sendEmail);
router.post(
  "/profile_pics",
  Auth,
  upload.single("image"),
  uploadProfilePicture
);

module.exports = router;
