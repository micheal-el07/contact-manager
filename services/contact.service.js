const { Contact } = require("../models/contact.model");

const addNewContact = async (newUser) => {
  try {
    const contact = await Contact.create(newUser);

    if (!contact) {
      throw new Error("Error occur while creating contact.");
    }

    return contact;
  } catch (error) {
    console.log({ message: "Error adding new contact", error: error.message });
    throw error;
  }
};

const getContact = async (searchParam) => {
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
    console.log({ message: "Error fetching contacts", error: error.message });
    throw error;
  }
};

module.export = { addNewContact, getContact };
