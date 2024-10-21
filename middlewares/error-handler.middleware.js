const errorHandler = (err, req, res, next) => {
  console.log("Error catched in errorHandler.");
  res.status(500).json({
    success: false,
    message: "Error occured during the process.",
    error: err.message,
  });
};

module.exports = errorHandler;
