const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'todo_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize database schema and tables if they don't exist
const initializeDatabase = async () => {
  let connection;
  try {
    connection = await pool.getConnection();

    // 1. Create tasks table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        is_completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_created_at (created_at DESC),
        INDEX idx_is_completed (is_completed)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await connection.query(createTableQuery);

    // 2. Check if table is empty, seed with initial sample data if needed
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM tasks');
    if (rows[0].count === 0) {
      const seedQuery = `
        INSERT INTO tasks (title, description, is_completed) VALUES
        ('Buy books', 'Buy books for the next school year', FALSE),
        ('Clean home', 'Need to clean the bed room', FALSE),
        ('Takehome assignment', 'Finish the mid-term assignment', FALSE),
        ('Play Cricket', 'Plan the soft ball cricket match on next Sunday', FALSE),
        ('Help Saman', 'Saman need help with his software project', FALSE);
      `;
      await connection.query(seedQuery);
      console.log('Database seeded with initial tasks');
    }
    console.log('Database schema verified successfully');
  } catch (error) {
    console.error('Error during database initialization:', error.message);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

// Test database connection with retries and initialize schema
const testConnection = async (retries = 10, delay = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const connection = await pool.getConnection();
      console.log('Database connected successfully');
      connection.release();

      // Automatically run schema initialization & seeding
      await initializeDatabase();
      return true;
    } catch (error) {
      console.error(`Database connection attempt ${i + 1}/${retries} failed:`, error.message);
      
      if (i < retries - 1) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('All database connection attempts failed');
        return false;
      }
    }
  }
};

// Close pool
const closePool = async () => {
  try {
    await pool.end();
    console.log('Database connection pool closed');
  } catch (error) {
    console.error('Error closing database pool:', error);
  }
};

module.exports = {
  pool,
  testConnection,
  closePool,
  initializeDatabase
};