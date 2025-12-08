const express = require('express');
const corsMiddleware = require('./middleware/cors');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const taskRoutes = require('./routes/taskRoutes');
const logger = require('./utils/logger');

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware - allow frontend to make requests
app.use(corsMiddleware);

// Custom request logging middleware
app.use((req, res, next) => {
  logger.request(req);
  next();
});

// Health check endpoint - useful for Docker and monitoring
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/tasks', taskRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Todo API is running',
    version: '1.0.0',
    endpoints: {
      tasks: '/api/tasks',
      health: '/health'
    }
  });
});

// 404 handler - must be after all routes
app.use(notFound);

// Error handler - must be last
app.use(errorHandler);

module.exports = app;