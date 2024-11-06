const { Router } = require("express");
const { getAllUserHandler, addUserHandler } = require("../controllers/user.controller");

const router = Router();

router.route("/").get(getAllUserHandler).post(addUserHandler)

module.exports = router;