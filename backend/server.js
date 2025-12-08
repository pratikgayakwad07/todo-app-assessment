require('dotenv').config();
const app = require('./src/app');
const { testConnection, closePool } = require('./src/config/database');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 5000;

// Start server function
const startServer = async () => {
  try {
    // Test database connection first
    logger.info('Testing database connection...');
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      logger.error('Failed to connect to database.  Exiting...');
      process.exit(1);
    }

    // Start the Express server
    const server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`Health check: http://localhost:${PORT}/health`);
      logger.info(`API endpoint: http://localhost:${PORT}/api/tasks`);
    });

    // Graceful shutdown handlers
    const gracefulShutdown = async (signal) => {
      logger. info(`${signal} received.  Starting graceful shutdown...`);
      
      // Close server first
      server.close(async () => {
        logger. info('HTTP server closed');
        
        // Close database connections
        await closePool();
        logger.info('Database connections closed');
        
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    // Listen for termination signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process. on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION!  Shutting down... ', err);
  process.exit(1);
});

// Start the server
startServer();