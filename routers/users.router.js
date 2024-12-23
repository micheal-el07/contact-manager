const { Router } = require("express");
const { getAllUserHandler, addUserHandler, getCurrentUserHandler } = require("../controllers/user.controller");
const { handleLogin } = require("../utils/authentication.utils");
const { isAuthenticated } = require("../middlewares/access-control.middleware");

const router = Router();

router.route("/").get(isAuthenticated ,getAllUserHandler)

router.route("/register").post(addUserHandler)

router.route("/current").get(isAuthenticated, getCurrentUserHandler)

router.route("/login").post(handleLogin, getCurrentUserHandler)

module.exports = router;