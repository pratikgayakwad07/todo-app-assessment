// Simple logger utility for consistent logging across the app
// In a real production app, you might use Winston or Morgan

const logger = {
  // Info level logging
  info: (message, data = null) => {
    const timestamp = new Date().toISOString();
    console.log(`[INFO] [${timestamp}] ${message}`);
    if (data) {
      console. log(JSON.stringify(data, null, 2));
    }
  },

  // Error level logging
  error: (message, error = null) => {
    const timestamp = new Date().toISOString();
    console. error(`[ERROR] [${timestamp}] ${message}`);
    if (error) {
      console. error('Error details:', error);
      if (error.stack) {
        console.error('Stack trace:', error.stack);
      }
    }
  },

  // Warning level logging
  warn: (message, data = null) => {
    const timestamp = new Date().toISOString();
    console. warn(`[WARN] [${timestamp}] ${message}`);
    if (data) {
      console.warn(JSON.stringify(data, null, 2));
    }
  },

  // Debug level logging (only in development)
  debug: (message, data = null) => {
    if (process.env. NODE_ENV === 'development') {
      const timestamp = new Date().toISOString();
      console.log(`[DEBUG] [${timestamp}] ${message}`);
      if (data) {
        console. log(JSON.stringify(data, null, 2));
      }
    }
  },

  // Log HTTP requests
  request: (req) => {
    const timestamp = new Date().toISOString();
    console.log(`[REQUEST] [${timestamp}] ${req.method} ${req.originalUrl}`);
    if (req.body && Object.keys(req.body). length > 0) {
      console.log('Body:', JSON.stringify(req.body, null, 2));
    }
  }
};

module.exports = logger;