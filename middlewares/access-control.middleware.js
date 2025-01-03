const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  const authHeader = req.headers;
  try {
    if (!authHeader.authorization) {
      return res.status(401).json({
        status: false,
        message: "Please include authentication token.",
      });
    }

    if (authHeader && authHeader.authorization.startsWith("Bearer")) {
      token = authHeader.authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ status: "failed", message: "Unauthorized, please login." });
        }
        req.user = decoded;
        next();
      });
    } else {
      return res.status(401).json({
        status: false,
        message: "Please use bearer token.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      location: "middleware/access-control/isAuthenticated",
      message: "Internal server error.",
      error: error.message,
    });
  }
});

module.exports = { isAuthenticated };
