const { User } = require("../models/user.model");

const userIdList = async () => {
  try {
    const users = await User.find();
    console.log(users);
  } catch (error) {
    return res.status(500).json({
      status: false,
      location: "services/user/userIdList",
      message: "Internal server error.",
      error: error,
    });
  }
};

const addNewUser = async (newUser) => {
  try {
    const user = await User.create(newUser);

    if (!user) {
      throw new Error("Error occur while creating user.");
    }
    return { status: true, data: user };
  } catch (error) {
    return res.status(500).json({
      status: false,
      location: "services/user/addNewUser",
      message: "Internal server error.",
      error: error,
    });
  }
};

const getUsers = async (searchParam) => {
  try {
    const users = await User.find(searchParam);

    if (users.length === 0) {
      return null;
    }

    if (!users) {
      throw new Error("Error occur while fetching contacts.");
    }

    return users;
  } catch (error) {
    return res.status(500).json({
      status: false,
      location: "services/user/getUsers",
      message: "Internal server error.",
      error: error,
    });
  }
};

module.exports = { addNewUser, getUsers, userIdList };
