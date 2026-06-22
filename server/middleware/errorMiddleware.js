const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  logger.error(`Error Pipeline Caught execution exception: ${err.stack}`);

  if (err.name === 'CastError') {
    const message = `Resource entity frame not discovered for identifier payload: ${err.value}`;
    error = new Error(message);
    res.statusCode = 404;
  }

  if (err.code === 11000) {
    const message = 'Duplicate unique database entity restriction rule collision';
    error = new Error(message);
    res.statusCode = 400;
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = new Error(message);
    res.statusCode = 400;
  }

  res.status(res.statusCode === 200 ? 500 : res.statusCode || 500).json({
    success: false,
    error: error.message || 'Fatal Intermittent Core Internal Server Operations Interruption',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};

module.exports = errorHandler;
