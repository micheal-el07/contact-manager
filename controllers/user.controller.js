const expressAsyncHandler = require("express-async-handler");
const { User } = require("../models/user.model");
const { getUsers, addNewUser } = require("../services/user.service");

const addUserHandler = expressAsyncHandler(async (req, res) => {
  const details = req.body;

  try {
    console.log("in controller");
    const user = await addNewUser(details);
    // const contact = details;

    if (!user.status) {
      return res.status(409).json({
        status: false,
        message: "Contact already existed.",
      });
    }

    return res.status(200).json({
      status: true,
      message: "New contact added successfully.",
      data: user.data,
    });
  } catch (error) {
    throw error;
  }
});

const getAllUserHandler = expressAsyncHandler(async (req, res) => {
  const details = req.body;

  try {
    // const users = await getUsers();
    const users = await User.find(details)

    if (users === null) {
      return res.status(404).json({ status: false, message: "No user found" });
    }

    res.status(200).json({
      status: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
});

module.exports = { getAllUserHandler, addUserHandler };
