const taskController = require('../../src/controllers/taskController');
const taskModel = require('../../src/models/taskModel');

// Mock the taskModel to avoid actual database calls
jest.mock('../../src/models/taskModel');

describe('Task Controller - Unit Tests', () => {
  
  let req, res;

  // Setup mock request and response objects before each test
  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(). mockReturnThis()
    };

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('getRecentTasks', () => {
    
    it('should return 5 most recent tasks successfully', async () => {
      const mockTasks = [
        { id: 1, title: 'Task 1', description: 'Description 1', is_completed: false },
        { id: 2, title: 'Task 2', description: 'Description 2', is_completed: false },
        { id: 3, title: 'Task 3', description: 'Description 3', is_completed: false }
      ];

      taskModel.getRecentTasks. mockResolvedValue(mockTasks);

      await taskController.getRecentTasks(req, res);

      expect(taskModel.getRecentTasks). toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: 3,
        data: mockTasks
      });
    });

    it('should handle errors when fetching tasks fails', async () => {
      const errorMessage = 'Database error';
      taskModel.getRecentTasks. mockRejectedValue(new Error(errorMessage));

      await taskController.getRecentTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to fetch tasks',
        error: errorMessage
      });
    });

    it('should return empty array when no tasks exist', async () => {
      taskModel. getRecentTasks.mockResolvedValue([]);

      await taskController.getRecentTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: 0,
        data: []
      });
    });
  });

  describe('createTask', () => {
    
    it('should create a new task successfully', async () => {
      req.body = {
        title: 'New Task',
        description: 'New task description'
      };

      const mockNewTask = {
        id: 1,
        title: 'New Task',
        description: 'New task description',
        is_completed: false
      };

      taskModel.createTask.mockResolvedValue(mockNewTask);

      await taskController.createTask(req, res);

      expect(taskModel.createTask).toHaveBeenCalledWith('New Task', 'New task description');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Task created successfully',
        data: mockNewTask
      });
    });

    it('should return 400 if title is missing', async () => {
      req.body = {
        description: 'Description only'
      };

      await taskController.createTask(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Title is required'
      });
    });

    it('should return 400 if description is missing', async () => {
      req.body = {
        title: 'Title only'
      };

      await taskController.createTask(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json). toHaveBeenCalledWith({
        success: false,
        message: 'Description is required'
      });
    });

    it('should return 400 if title is empty string', async () => {
      req.body = {
        title: '   ',
        description: 'Valid description'
      };

      await taskController.createTask(req, res);

      expect(res. status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Title is required'
      });
    });

    it('should trim whitespace from title and description', async () => {
      req.body = {
        title: '  Task with spaces  ',
        description: '  Description with spaces  '
      };

      const mockNewTask = {
        id: 1,
        title: 'Task with spaces',
        description: 'Description with spaces',
        is_completed: false
      };

      taskModel.createTask.mockResolvedValue(mockNewTask);

      await taskController.createTask(req, res);

      expect(taskModel. createTask).toHaveBeenCalledWith('Task with spaces', 'Description with spaces');
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should handle database errors during task creation', async () => {
      req.body = {
        title: 'Valid Task',
        description: 'Valid Description'
      };

      taskModel.createTask.mockRejectedValue(new Error('Database connection failed'));

      await taskController. createTask(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res. json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to create task',
        error: 'Database connection failed'
      });
    });
  });

  describe('completeTask', () => {
    
    it('should mark task as completed successfully', async () => {
      req.params = { id: '1' };

      const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        is_completed: false
      };

      taskModel. getTaskById.mockResolvedValue(mockTask);
      taskModel.markTaskCompleted.mockResolvedValue(true);

      await taskController.completeTask(req, res);

      expect(taskModel.getTaskById).toHaveBeenCalledWith('1');
      expect(taskModel.markTaskCompleted).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Task marked as completed'
      });
    });

    it('should return 404 if task does not exist', async () => {
      req.params = { id: '999' };

      taskModel.getTaskById.mockResolvedValue(null);

      await taskController.completeTask(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Task not found'
      });
    });

    it('should return 400 if task is already completed', async () => {
      req.params = { id: '1' };

      const mockCompletedTask = {
        id: 1,
        title: 'Completed Task',
        description: 'Already done',
        is_completed: true
      };

      taskModel. getTaskById.mockResolvedValue(mockCompletedTask);

      await taskController.completeTask(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Task is already completed'
      });
    });

    it('should return 400 if task ID is invalid', async () => {
      req.params = { id: 'invalid' };

      await taskController.completeTask(req, res);

      expect(res. status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid task ID'
      });
    });

    it('should handle database errors when completing task', async () => {
      req.params = { id: '1' };

      const mockTask = {
        id: 1,
        title: 'Test Task',
        is_completed: false
      };

      taskModel.getTaskById. mockResolvedValue(mockTask);
      taskModel.markTaskCompleted.mockRejectedValue(new Error('Update failed'));

      await taskController. completeTask(req, res);

      expect(res.status). toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to complete task',
        error: 'Update failed'
      });
    });
  });

  describe('getAllTasks', () => {
    
    it('should return all tasks successfully', async () => {
      const mockAllTasks = [
        { id: 1, title: 'Task 1', is_completed: false },
        { id: 2, title: 'Task 2', is_completed: true },
        { id: 3, title: 'Task 3', is_completed: false }
      ];

      taskModel.getAllTasks.mockResolvedValue(mockAllTasks);

      await taskController.getAllTasks(req, res);

      expect(taskModel.getAllTasks).toHaveBeenCalledTimes(1);
      expect(res. status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: 3,
        data: mockAllTasks
      });
    });

    it('should handle errors when fetching all tasks', async () => {
      taskModel.getAllTasks.mockRejectedValue(new Error('Database error'));

      await taskController. getAllTasks(req, res);

      expect(res.status). toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to fetch all tasks',
        error: 'Database error'
      });
    });
  });
});