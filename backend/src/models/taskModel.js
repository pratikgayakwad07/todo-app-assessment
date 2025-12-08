const { pool } = require('../config/database');

// Model for handling all database operations related to tasks
class TaskModel {
  
  // Get most recent 5 incomplete tasks
  // We only want to show active tasks, sorted by newest first
  async getRecentTasks() {
    try {
      const query = `
        SELECT id, title, description, is_completed, created_at, updated_at 
        FROM tasks 
        WHERE is_completed = FALSE 
        ORDER BY created_at DESC 
        LIMIT 5
      `;
      
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      console.error('Error fetching recent tasks:', error. message);
      throw error;
    }
  }

  // Create a new task
  async createTask(title, description) {
    try {
      const query = `
        INSERT INTO tasks (title, description, is_completed) 
        VALUES (?, ?, FALSE)
      `;
      
      const [result] = await pool.query(query, [title, description]);
      
      // Return the newly created task
      if (result.insertId) {
        return await this.getTaskById(result. insertId);
      }
      
      return null;
    } catch (error) {
      console.error('Error creating task:', error.message);
      throw error;
    }
  }

  // Get a single task by ID
  async getTaskById(id) {
    try {
      const query = 'SELECT * FROM tasks WHERE id = ?';
      const [rows] = await pool.query(query, [id]);
      
      return rows. length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error fetching task by ID:', error.message);
      throw error;
    }
  }

  // Mark a task as completed
  async markTaskCompleted(id) {
    try {
      const query = `
        UPDATE tasks 
        SET is_completed = TRUE, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ? 
      `;
      
      const [result] = await pool. query(query, [id]);
      
      // Check if any row was actually updated
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error marking task as completed:', error.message);
      throw error;
    }
  }

  // Get all tasks (useful for testing)
  async getAllTasks() {
    try {
      const query = 'SELECT * FROM tasks ORDER BY created_at DESC';
      const [rows] = await pool. query(query);
      return rows;
    } catch (error) {
      console.error('Error fetching all tasks:', error.message);
      throw error;
    }
  }

  // Delete a task (useful for testing/cleanup)
  async deleteTask(id) {
    try {
      const query = 'DELETE FROM tasks WHERE id = ?';
      const [result] = await pool.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting task:', error.message);
      throw error;
    }
  }
}

module. exports = new TaskModel();