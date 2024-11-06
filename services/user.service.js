const { User } = require("../models/user.model");

const addNewUser = async (newUser) => {
  try {
    const user = newUser
    // const user = await User.create(newUser);

    // if (!user) {
    //   throw new Error("Error occur while creating user.");
    // }

    return user;
  } catch (error) {
    console.log({ message: "Error adding new user", error: error.message });
    throw error;
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
    console.log({ message: "Error fetching users", error: error.message });
    throw error;
  }
};


module.exports = { addNewUser, getUsers };