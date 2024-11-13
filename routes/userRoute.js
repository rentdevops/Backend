const express = require("express");
const { getUsers, CreateUser, Login } = require("../ctrl/userCtrl");
const Auth = require("../middleware/Auth");
const router = express.Router();

router.get("/", Auth, getUsers);
router.post("/create_account", CreateUser);
router.post("/login", Login);

module.exports = router;
