const express = require("express");
const { createNewsLetter, getNewsletter } = require("../ctrl/newsLetter");
const router = express.Router();

router.post("/", createNewsLetter);
router.get("/", getNewsletter);

module.exports = router;
