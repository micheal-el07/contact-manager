const { User } = require("../models/user.model");

const userIdList = async () => {
  try {
    const users = await User.find();
    console.log(users);
  } catch (error) {
    throw Error(error);
  }
};

const addNewUser = async (newUser) => {
  try {
    console.log("in service");
    // const user = newUser
    const user = await User.create(newUser);

    if (!user) {
      throw new Error("Error occur while creating user.");
    }
    // return user;
    return { status: true, data: user };
  } catch (error) {
    console.log({ message: "Error occured in user services, addNewUser function.", error: error.message });
    throw Error(error);
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
    console.log({ message: "Error occured in user services, getUsers function.", error: error.message });
    throw Error(error);
  }
};

module.exports = { addNewUser, getUsers, userIdList };
