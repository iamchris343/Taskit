
const request = require('supertest');
const mongoose = require('mongoose');

// Import the Express app
const app = require('../app');

let createdTaskId;

// Clean up database connection after all tests run
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Taskit API Automation Tests', () => {

  // TEST 1: Create a valid task
  it('1. Should create a new task successfully', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Learn Automated Testing',
        description: 'Set up 5 integration tests using Jest and Supertest.',
        status: 'done',
        dueDate: '2026-10-05'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);

    // Verify the returned task
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data.title).toBe('Learn Automated Testing');
    expect(res.body.data.description).toBe(
      'Set up 5 integration tests using Jest and Supertest.'
    );
    expect(res.body.data.status).toBe('done');

    // Save the ID for the remaining tests
    createdTaskId = res.body.data._id;
  });


  // TEST 2: Validation Failure
  it('2. Should fail to create a task if title is missing', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({
        description: 'Missing title field'
      });

    expect(res.statusCode).toBe(400);
  });


  // TEST 3: Fetch all tasks
  it('3. Should fetch all tasks successfully', async () => {
    const res = await request(app)
      .get('/api/tasks');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });


  // TEST 4: Fetch single task
  it('4. Should fetch a single task by ID', async () => {
    const res = await request(app)
      .get(`/api/tasks/${createdTaskId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBe(createdTaskId);
    expect(res.body.data.title).toBe('Learn Automated Testing');
  });


  // TEST 5: Delete a task
  it('5. Should delete a task successfully by ID', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${createdTaskId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    // Verify the task no longer exists
    const checkRes = await request(app)
      .get(`/api/tasks/${createdTaskId}`);

    expect(checkRes.statusCode).toBe(404);
  });

})
