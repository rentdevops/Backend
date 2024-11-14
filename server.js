require("express-async-errors");
require("dotenv").config();
const express = require("express");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const connectDB = require("./db_config/config");
const { NotFound } = require("./error_ctrl/notFound");
const errorHandler = require("./middleware/errorHandler");
const app = express();
app.use(express.json());
app.use("/api/v1/users", userRoute);
app.use("/api/v1/post", postRoute);
app.use(errorHandler);
app.use(NotFound);
app.listen(4000, () => {
  console.log("server running...");
  connectDB();
});
