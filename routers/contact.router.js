const { Router } = require("express");
const { getAllContactHandler, addContactHandler, getContactByIdHandler, deleteContactByIdHandler, updateContactByIdHandler } = require("../controllers/contact.controller");
const { isAuthenticated } = require("../middlewares/access-control.middleware");

const router = Router();

router.use(isAuthenticated)

router.route("/").get(getAllContactHandler).post(addContactHandler)

router.route("/:id").get(getContactByIdHandler).put(updateContactByIdHandler).delete(deleteContactByIdHandler)

module.exports = router;