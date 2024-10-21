const express = require("express");
const mongoose = require("mongoose");
const { PORT, MONGO_URL } = require("./config/env.config")

const app = express();
// const MONGOURL = MONGO_URL;

mongoose.connect(MONGO_URL).then(() => {
    console.log("Database is connected successfully.");
}).catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hey");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
