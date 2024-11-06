const { Router } = require("express");
const contactRouter = require("../routers/contact.router");
const userRouter = require("../routers/users.router");

const router = Router();

router.use("/contacts", contactRouter);
router.use("/users", userRouter);

module.exports = { router };
