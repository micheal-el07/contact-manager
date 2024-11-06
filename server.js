const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const asyncHandler = require("express-async-handler");

const { router } = require("./routers");
const { PORT, MONGO_URL } = require("./configs/env.config");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create connection to mongodb atlas
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connected.");
  })
  .catch((error) => {
    console.log(error);
  });

// GET placeholder
// app.get("/", (req, res) => {
//   res.send("Hey");
// });

app.use("/api", router);

// Throwing 404 error for invalid endpoint
app.all("*", (req, res) => {
  res.status(404).json({ status: "failed", message: "Invalid endpoint" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
