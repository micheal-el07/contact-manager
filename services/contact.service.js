const { Contact } = require("../models/contact.model");
const client = require("../utils/redis.utils");

const addNewContact = async (newUser) => {
  try {
    const contact = await Contact.create(newUser);

    if (!contact) {
      throw new Error("Error occur while creating contact.");
    }

    return contact;
  } catch (error) {
    return res.status(500).json({
      status: false,
      location: "services/contact/addNewContact",
      message: "Internal server error.",
      error: error,
    });
  }
};

const getContacts = async (searchParam) => {
  const key = searchParam.user;

  try {
    const contacts = await Contact.find(searchParam);

    if (contacts.length === 0) {
      return null;
    }

    if (!contacts) {
      throw new Error("Error occur while fetching contacts.");
    }

    return contacts;
  } catch (error) {
    return res.status(500).json({
      status: false,
      location: "services/contact/getContacts",
      message: "Internal server error.",
      error: error,
    });
  }
};

const updateContact = async (id, details) => {
  try {
    const updated = await Contact.findByIdAndUpdate(id, details);

    return updated;
  } catch (error) {
    return res.status(500).json({
      status: false,
      location: "services/contact/editContact",
      message: "Internal server error.",
      error: error,
    });
  }
};

const deleteContact = async (searchParam) => {
  try {
    const contact = await Contact.deleteOne(searchParam);

    return contact;
  } catch (error) {
    return res.status(500).json({
      status: false,
      location: "services/contact/deleteContact",
      message: "Internal server error.",
      error: error,
    });
  }
};

module.exports = { addNewContact, getContacts, updateContact, deleteContact };
