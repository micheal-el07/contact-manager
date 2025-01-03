const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const redis = require("redis");

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

app.use("/api", router);

// Throwing 404 error for invalid endpoint
app.all("*", (req, res) => {
  try {
    res.status(404).json({ status: "failed", message: "Invalid endpoint" });
  } catch (error) {
    return res.status(500).json({
      status: false,
      location: "server.js",
      message: "Internal server error.",
      error: error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
