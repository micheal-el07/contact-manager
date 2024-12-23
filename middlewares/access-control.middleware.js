const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  const authHeader = req.headers;
  try {
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
    }

  } catch (error) {
    throw Error(error)
  }
  
});

module.exports = { isAuthenticated };
