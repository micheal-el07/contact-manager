const { Router } = require("express");
const contactRouter = require("../routers/contact.router");
const userRouter = require("../routers/users.router");
const redis = require("redis");
const expressAsyncHandler = require("express-async-handler");

const router = Router();

router.use("/contacts", contactRouter);
router.use("/users", userRouter);

module.exports = { router };
