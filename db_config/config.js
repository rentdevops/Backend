const mongoose = require("mongoose");
const clientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: false,
  ssl: true,
  sslValidate: true,
};

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, clientOptions)
    .then(() => console.log("MongoDB Connected..."));
};

module.exports = connectDB;








// const mongoose = require("mongoose");
// const clientOptions = {
//   serverApi: { version: "1", strict: true, deprecationErrors: true },
// };
// const connectDB = async () => {
//   await mongoose
//     .connect(process.env.MONGO_URI, clientOptions)
//     .then(() => console.log("MongoDB Connected..."));
// };

// module.exports = connectDB;
