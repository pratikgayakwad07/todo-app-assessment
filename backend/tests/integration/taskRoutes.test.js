const request = require('supertest');
const app = require('../../src/app');
const { pool } = require('../../src/config/database');

describe('Task Routes - Integration Tests', () => {

  // Clean up database before running tests
  beforeAll(async () => {
    try {
      await pool.query('DELETE FROM tasks');
    } catch (error) {
      console. error('Error cleaning database:', error);
    }
  });

  // Clean up after each test
  afterEach(async () => {
    try {
      await pool.query('DELETE FROM tasks');
    } catch (error) {
      console.error('Error cleaning database:', error);
    }
  });

  // Close database connection after all tests
  afterAll(async () => {
    try {
      await pool.end();
    } catch (error) {
      console.error('Error closing database:', error);
    }
  });

  describe('GET /api/tasks', () => {

    it('should return empty array when no tasks exist', async () => {
      const response = await request(app)
        .get('/api/tasks')
        . expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
      expect(response.body.count). toBe(0);
    });

    it('should return only incomplete tasks', async () => {
      // Create some tasks
      await pool.query(
        'INSERT INTO tasks (title, description, is_completed) VALUES (?, ?, ?)',
        ['Task 1', 'Description 1', false]
      );
      await pool.query(
        'INSERT INTO tasks (title, description, is_completed) VALUES (?, ?, ?)',
        ['Task 2', 'Description 2', true]
      );
      await pool.query(
        'INSERT INTO tasks (title, description, is_completed) VALUES (?, ?, ?)',
        ['Task 3', 'Description 3', false]
      );

      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(2);
      expect(response.body.data. every(task => task.is_completed === 0)).toBe(true);
    });

    it('should return maximum 5 tasks', async () => {
      // Create 7 tasks
      for (let i = 1; i <= 7; i++) {
        await pool.query(
          'INSERT INTO tasks (title, description) VALUES (?, ?)',
          [`Task ${i}`, `Description ${i}`]
        );
      }

      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response. body.count).toBe(5);
      expect(response.body.data). toHaveLength(5);
    });

    it('should return tasks sorted by created_at DESC', async () => {
      // Insert tasks with small delay to ensure different timestamps
      await pool.query(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        ['First Task', 'First Description']
      );
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      await pool.query(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        ['Second Task', 'Second Description']
      );

      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(response.body.data[0].title).toBe('Second Task');
      expect(response. body.data[1].title). toBe('First Task');
    });
  });

  describe('POST /api/tasks', () => {

    it('should create a new task successfully', async () => {
      const newTask = {
        title: 'Buy groceries',
        description: 'Need to buy milk and eggs'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(newTask)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message). toBe('Task created successfully');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.title).toBe(newTask.title);
      expect(response.body.data. description).toBe(newTask. description);
      expect(response.body.data. is_completed).toBe(0);
    });

    it('should return 400 if title is missing', async () => {
      const invalidTask = {
        description: 'Description without title'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidTask)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message). toBe('Title is required');
    });

    it('should return 400 if description is missing', async () => {
      const invalidTask = {
        title: 'Title without description'
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidTask)
        .expect(400);

      expect(response. body.success).toBe(false);
      expect(response.body.message).toBe('Description is required');
    });

    it('should return 400 if title is empty string', async () => {
      const invalidTask = {
        title: '   ',
        description: 'Valid description'
      };

      const response = await request(app)
        .post('/api/tasks')
        . send(invalidTask)
        . expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should return 400 if title exceeds 255 characters', async () => {
      const invalidTask = {
        title: 'a'.repeat(256),
        description: 'Valid description'
      };

      const response = await request(app)
        . post('/api/tasks')
        .send(invalidTask)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should trim whitespace from title and description', async () => {
      const taskWithSpaces = {
        title: '  Task with spaces  ',
        description: '  Description with spaces  '
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(taskWithSpaces)
        .expect(201);

      expect(response.body. data.title).toBe('Task with spaces');
      expect(response.body.data.description).toBe('Description with spaces');
    });
  });

  describe('PUT /api/tasks/:id/complete', () => {

    it('should mark task as completed successfully', async () => {
      // Create a task first
      const [result] = await pool.query(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        ['Task to complete', 'This will be completed']
      );

      const taskId = result.insertId;

      const response = await request(app)
        .put(`/api/tasks/${taskId}/complete`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message). toBe('Task marked as completed');

      // Verify in database
      const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ? ', [taskId]);
      expect(rows[0].is_completed).toBe(1);
    });

    it('should return 404 if task does not exist', async () => {
      const response = await request(app)
        .put('/api/tasks/99999/complete')
        .expect(404);

      expect(response. body.success).toBe(false);
      expect(response.body.message).toBe('Task not found');
    });

    it('should return 400 if task is already completed', async () => {
      // Create a completed task
      const [result] = await pool.query(
        'INSERT INTO tasks (title, description, is_completed) VALUES (?, ?, ?)',
        ['Already done', 'This is already completed', true]
      );

      const taskId = result.insertId;

      const response = await request(app)
        .put(`/api/tasks/${taskId}/complete`)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message). toBe('Task is already completed');
    });

    it('should return 400 if task ID is invalid', async () => {
      const response = await request(app)
        .put('/api/tasks/invalid-id/complete')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response. body.message).toBe('Invalid task ID');
    });
  });

  describe('GET /api/tasks/all', () => {

    it('should return all tasks including completed ones', async () => {
      // Create tasks with different statuses
      await pool. query(
        'INSERT INTO tasks (title, description, is_completed) VALUES (?, ?, ?)',
        ['Active Task', 'Not done yet', false]
      );
      await pool.query(
        'INSERT INTO tasks (title, description, is_completed) VALUES (?, ?, ?)',
        ['Completed Task', 'Already done', true]
      );

      const response = await request(app)
        .get('/api/tasks/all')
        .expect(200);

      expect(response.body. success).toBe(true);
      expect(response.body.count).toBe(2);
      expect(response.body.data). toHaveLength(2);
    });
  });

  describe('Health Check & Root Endpoints', () => {

    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body. success).toBe(true);
      expect(response.body.message).toBe('Server is running');
    });

    it('should return API info on root endpoint', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body. success).toBe(true);
      expect(response.body.message).toBe('Todo API is running');
      expect(response.body.endpoints).toHaveProperty('tasks');
    });
  });

  describe('404 Handling', () => {

    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        . get('/api/nonexistent')
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });
});