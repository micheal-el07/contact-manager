const expressAsyncHandler = require("express-async-handler");
const { getUsers, addNewUser } = require("../services/user.service");
const bcrypt = require("bcryptjs");

const addUserHandler = expressAsyncHandler(async (req, res) => {
  const details = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(details.password, salt);
  details.password = hash;

  try {
    const existingUser = await getUsers(details.username);

    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: "Contact already existed.",
      });
    }

    const user = await addNewUser(details);

    return res.status(200).json({
      status: true,
      message: "New contact added successfully.",
      data: user.data,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      location: "controllers/user/addUserHandler",
      message: "Internal server error.",
      error: error,
    });
  }
});

const getCurrentUserHandler = expressAsyncHandler(async (req, res) => {
  const username = req.user.username;
  console.log(username);
  try {
    const user = await getUsers({ username: username });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: `User with username [${username}] does not exist.`,
      });
    }
    res
      .status(200)
      .json({ status: "success", message: "User found.", result: user });
  } catch (error) {
    return res.status(500).json({
      status: false,
      location: "controllers/user/getCurrentUserHandler",
      message: "Internal server error.",
      error: error,
    });
  }
});

const getAllUserHandler = expressAsyncHandler(async (req, res) => {
  const details = req.body;

  try {
    const users = await getUsers();

    if (users === null) {
      return res.status(404).json({ status: false, message: "No user found" });
    }

    res.status(200).json({
      status: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      location: "controllers/user/getAllUserHandler",
      message: "Internal server error.",
      error: error,
    });
  }
});

module.exports = { getAllUserHandler, addUserHandler, getCurrentUserHandler };
