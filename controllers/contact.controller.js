const expressAsyncHandler = require("express-async-handler");
const { Contact } = require("../models/contact.model");
const { User } = require("../models/user.model");

const mongoose = require("mongoose");
const {
  getContacts,
  addNewContact,
  deleteContact,
  updateContact,
} = require("../services/contact.service");
const { getUsers } = require("../services/user.service");

const addContactHandler = expressAsyncHandler(async (req, res) => {
  const details = req.body;
  const username = req.user.username;
  console.log(username, "username in addcontact");

  try {
    const user = await User.findOne({ username: username });
    const id = user._id.toString();

    const findContact = await Contact.findOne({ user: id, name: details.name });
    console.log(findContact, "found contacts");

    if (findContact) {
      return res.status(409).json({
        status: false,
        message: "Contact already exist!",
      });
    }

    const contact = await addNewContact({ ...details, user: id });

    if (!contact) {
      throw new Error("Error in adding contact");
    }

    return res.status(201).json({
      status: true,
      message: "New contact added successfully.",
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      location: "controllers/contact/addContactHandler",
      message: "Internal server error.",
      error: error,
    });
  }
});

const getAllContactHandler = expressAsyncHandler(async (req, res) => {
  try {
    const contacts = await getContacts();

    if (contacts === null) {
      return res.status(404).json({ status: false, message: "No user found" });
    }

    return res.status(200).json({
      status: true,
      message: "Contact fetched successfully",
      data: contacts,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      location: "controllers/contact/getAllContactHandler",
      message: "Internal server error.",
      error: error,
    });
  }
});

const getContactByIdHandler = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const username = req.user.username;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid ID!",
      });
    }

    const findRequestedId = await getUsers({ _id: id });

    if (!findRequestedId) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
      });
    }

    if (findRequestedId[0].username !== username) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }
    const contacts = await getContacts({ user: id });

    if (!contacts) {
      return res.status(404).json({
        status: false,
        message: "No contacts found.",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Contact fetched successfully",
      data: contacts,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      location: "controllers/contact/getContactByIdHandler",
      message: "Internal server error.",
      error: error.message,
    });
  }
});

const updateContactByIdHandler = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const updateDetails = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid ID!",
      });
    }

    const contact = await updateContact(id, updateDetails);

    if (!contact) {
      return res
        .status(404)
        .json({ status: false, message: "Contact does not exist." });
    }

    return res
      .status(200)
      .json({ status: true, message: "Contact updated", data: contact });
  } catch (error) {
    return res.status(500).json({
      status: false,
      location: "controllers/contact/updateContactByIdHandler",
      message: "Internal server error.",
      error: error,
    });
  }
});

const deleteContactByIdHandler = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const username = req.user.username;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid ID!",
      });
    }

    const currentUserDocument = await getUsers({ username: username });
    const contact = await deleteContact({ _id: id });

    res
      .status(200)
      .json({ status: true, message: "Contact successfully deleted." });
  } catch (error) {
    return res.status(500).json({
      status: false,
      location: "controllers/contact/deleteContactByIdHandler",
      message: "Internal server error.",
      error: error,
    });
  }
});

module.exports = {
  getAllContactHandler,
  addContactHandler,
  getContactByIdHandler,
  updateContactByIdHandler,
  deleteContactByIdHandler,
};
