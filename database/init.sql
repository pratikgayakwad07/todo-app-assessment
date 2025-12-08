-- Database initialization script for todo application
-- This will run automatically when MySQL container starts

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS todo_db;

USE todo_db;

-- Drop table if exists (useful for development/testing)
DROP TABLE IF EXISTS tasks;

-- Create the tasks table
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create index on created_at for faster sorting
-- Since we're fetching most recent 5 tasks, this helps performance
CREATE INDEX idx_created_at ON tasks(created_at DESC);

-- Create index on is_completed for filtering active tasks
CREATE INDEX idx_is_completed ON tasks(is_completed);

-- Insert some sample data for testing (optional - you can remove this later)
INSERT INTO tasks (title, description, is_completed) VALUES
('Buy books', 'Buy books for the next school year', FALSE),
('Clean home', 'Need to clean the bed room', FALSE),
('Takehome assignment', 'Finish the mid-term assignment', FALSE),
('Play Cricket', 'Plan the soft ball cricket match on next Sunday', FALSE),
('Help Saman', 'Saman need help with his software project', FALSE);

-- Verify the table structure
DESCRIBE tasks;

-- Show initial data count
SELECT COUNT(*) as total_tasks FROM tasks;