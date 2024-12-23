const { Contact } = require("../models/contact.model");

const addNewContact = async (newUser) => {
  try {
    const contact = await Contact.create(newUser);

    if (!contact) {
      throw new Error("Error occur while creating contact.");
    }

    return contact;
  } catch (error) {
    console.log({
      message: "Error occured in contact services, addNewContact function.",
      error: error.message,
    });
    throw Error(error);
  }
};

const getContacts = async (searchParam) => {
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
    console.log({
      message: "Error occured in contact services, getContacts function.",
      error: error.message,
    });
    throw Error(error);
  }
};

const updateContact = async (id, details) => {
  try {
    const updated = await Contact.findByIdAndUpdate(id, details);

    return updated;
  } catch (error) {
    console.log({
      message: "Error occured in contact services, editContact function.",
      error: error.message,
    });
    throw Error(error);
  }
};

const deleteContact = async (searchParam) => {
  try {
    const contact = await Contact.deleteOne(searchParam);

    return contact;
  } catch (error) {
    console.log({
      message: "Error occured in contact services, deleteContact function.",
      error: error.message,
    });
    throw Error(error);
  }
};

module.exports = { addNewContact, getContacts, updateContact, deleteContact };
