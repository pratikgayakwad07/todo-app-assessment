const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { body } = require('express-validator');

// Validation middleware for creating tasks
const createTaskValidation = [
  body('title')
    .trim()
    . notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 1 })
    .withMessage('Description cannot be empty')
];

// @route   GET /api/tasks
// @desc    Get the 5 most recent incomplete tasks
// @access  Public
router. get('/', taskController.getRecentTasks);

// @route   GET /api/tasks/all
// @desc    Get all tasks (for testing)
// @access  Public
router.get('/all', taskController.getAllTasks);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Public
router.post('/', createTaskValidation, taskController.createTask);

// @route   PUT /api/tasks/:id/complete
// @desc    Mark a task as completed
// @access  Public
router.put('/:id/complete', taskController.completeTask);

module.exports = router;