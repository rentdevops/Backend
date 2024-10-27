const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Vite with Express!");
});

app.listen(4000, () => {
  console.log("server running...");
});
