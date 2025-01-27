require("express-async-errors");
require("dotenv").config();
const express = require("express");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const replyCommentRoute = require("./routes/replyCommentRoute");
const connectDB = require("./db_config/config");
const { NotFound } = require("./error_ctrl/notFound");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use("/api/v1/users", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/reply", replyCommentRoute);
app.use(errorHandler);
app.use(NotFound);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  connectDB();
  console.log(`server running on port ${port}...`);
});
