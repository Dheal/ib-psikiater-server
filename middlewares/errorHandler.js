"use strict";

const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  res.status(400).json({
    message: err.message,
  });
};

module.exports = errorHandler;
