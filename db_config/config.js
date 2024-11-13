const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
const connectDB = () => {
  mongoose.connect(uri, {}).then(() => console.log("MongoDB Connected..."));
};

module.exports = connectDB;
