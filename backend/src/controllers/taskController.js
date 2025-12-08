const taskModel = require('../models/taskModel');
const { validationResult } = require('express-validator');

// Controller handles the business logic and responds to HTTP requests
class TaskController {
  
  // Get the 5 most recent incomplete tasks
  async getRecentTasks(req, res) {
    try {
      const tasks = await taskModel.getRecentTasks();
      
      res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
      });
    } catch (error) {
      console.error('Controller error in getRecentTasks:', error. message);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch tasks',
        error: error.message
      });
    }
  }

  // Create a new task
  async createTask(req, res) {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400). json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { title, description } = req.body;

      // Basic validation - make sure fields aren't empty
      if (!title || !title.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Title is required'
        });
      }

      if (!description || ! description.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Description is required'
        });
      }

      const newTask = await taskModel.createTask(title. trim(), description.trim());

      if (newTask) {
        res.status(201).json({
          success: true,
          message: 'Task created successfully',
          data: newTask
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to create task'
        });
      }
    } catch (error) {
      console.error('Controller error in createTask:', error.message);
      res.status(500). json({
        success: false,
        message: 'Failed to create task',
        error: error.message
      });
    }
  }

  // Mark a task as completed
  async completeTask(req, res) {
    try {
      const { id } = req.params;

      // Validate ID is a number
      if (! id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid task ID'
        });
      }

      // Check if task exists first
      const task = await taskModel.getTaskById(id);
      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }

      // Check if already completed
      if (task.is_completed) {
        return res.status(400).json({
          success: false,
          message: 'Task is already completed'
        });
      }

      const updated = await taskModel.markTaskCompleted(id);

      if (updated) {
        res.status(200).json({
          success: true,
          message: 'Task marked as completed'
        });
      } else {
        res.status(500). json({
          success: false,
          message: 'Failed to update task'
        });
      }
    } catch (error) {
      console.error('Controller error in completeTask:', error.message);
      res.status(500).json({
        success: false,
        message: 'Failed to complete task',
        error: error.message
      });
    }
  }

  // Get all tasks (for testing purposes)
  async getAllTasks(req, res) {
    try {
      const tasks = await taskModel.getAllTasks();
      
      res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
      });
    } catch (error) {
      console.error('Controller error in getAllTasks:', error.message);
      res.status(500). json({
        success: false,
        message: 'Failed to fetch all tasks',
        error: error. message
      });
    }
  }
}

module.exports = new TaskController();