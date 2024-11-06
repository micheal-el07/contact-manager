const expressAsyncHandler = require("express-async-handler");
const { Contact } = require("../models/contact.model");
const { getContact, addNewContact } = require("../services/contact.service");
const { User } = require("../models/user.model");

const addContactHandler = expressAsyncHandler(async (req, res) => {
  const details = req.body;

  try {
    // // const contact = await addNewContact(details);
    // const contact = details;

    // return res.status(200).json({
    //   status: true,
    //   message: "New contact added successfully.",
    //   data: contact,
    // });

    const user = await User.findById(details.id);

    if (!user) {
      throw new Error("User not found");
    }

    // Create a new contact with the user reference
    const newContact = new Contact({
      user: details.id, // Reference to the user ID
      name: details.name,
      email: details.email,
      phone: details.phone,
    });

    // Save the contact to the database
    await newContact.save();

    return {
      status: "success",
      message: "Contact added successfully",
      data: newContact,
    };
  } catch (error) {
    throw error;
  }
});

const getAllContactHandler = expressAsyncHandler(async (req, res) => {
  try {
    const contacts = await getContact();

    if (contacts === null) {
      return res.status(404).json({ status: false, message: "No user found" });
    }

    return res.status(200).json({
      status: true,
      message: "Contact fetched successfully",
      data: contacts,
    });
  } catch (error) {
    throw error;
  }
});

module.exports = { getAllContactHandler, addContactHandler };
