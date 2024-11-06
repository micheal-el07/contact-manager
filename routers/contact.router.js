const { Router } = require("express");
const { getAllContactHandler } = require("../controllers/contact.controller");

const router = Router();

router.route("/").get(getAllContactHandler)

module.exports = router;