// Global error handling middleware
// This catches any errors that happen in our routes/controllers

const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });

  // Default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  }

  if (err.code === 'ER_DUP_ENTRY') {
    statusCode = 400;
    message = 'Duplicate entry found';
  }

  // MySQL connection errors
  if (err.code === 'ECONNREFUSED') {
    statusCode = 503;
    message = 'Database connection failed';
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message: message,
    error: process.env.NODE_ENV === 'development' ? err. message : undefined,
    stack: process.env. NODE_ENV === 'development' ? err. stack : undefined
  });
};

// Handle 404 errors - when route doesn't exist
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req. originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };