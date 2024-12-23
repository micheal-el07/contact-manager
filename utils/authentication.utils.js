const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { findOneUser } = require("../services/user.service");
const { User } = require("../models/user.model");
const { ACCESS_TOKEN_SECERT } = require("../configs/env.config");

// Handle logging in process.
const handleLogin = async (req, res, next) => {
  const { username, password } = req.body;

  if (!(username && password))
    return res.status(400).json({
      status: "failed",
      message: "Bad request. Username and password are required.",
    });

  const foundUser = await User.find({ username:username });
  console.log(foundUser);
  if (!foundUser)
    return res.status(404).json({
      status: "failed",
      message: `No user with username ${username} was found!`,
    });

  // Evaluate password
  const match = await bcrypt.compare(password, foundUser[0].password);
  if (match) {
    // create jwt
    const accessToken = jwt.sign({ username: username }, ACCESS_TOKEN_SECERT, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(
      { username: username },
      "temp_jwt_secret_refresh",
      {
        expiresIn: "1d",
      }
    );

    // res.cookie("jwt", accessToken, {
    //   httpOnly: true,
    //   maxAge: 5 * 60 * 1000,
    // });
    res.json({
      status: "success",
      mesage: `User ${username} successfully logged in.`,
      token: accessToken,
    });
    // next();
  } else {
    res.status(401).json({ status: "failed", message: "Wrong password!" });
  }
};

module.exports = { handleLogin };