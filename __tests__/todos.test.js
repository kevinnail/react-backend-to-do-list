const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const Todo = require('../lib/models/Todo.js');

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345',
};

const registerAndLogin = async () => {
  const agent = request.agent(app);
  const user = await UserService.create(mockUser);
  await agent
    .post('/api/v1/users/sessions')
    .send({ email: mockUser.email, password: mockUser.password });
  return [agent, user];
};
describe('blog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('GET /api/v1/todos', async () => {
    const [agent] = await registerAndLogin();
    const resp = await agent.get('/api/v1/todos');
    expect(resp.status).toBe(200);
  });

  it('GET /api/v1/todos/:id', async () => {
    const [agent] = await registerAndLogin();
    const resp = await agent.get('/api/v1/todos/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      completed: false,
      created_at: expect.any(String),
      id: expect.any(String),
      task: 'Mow lawn',
      user_id: '1',
    });
  });

  it('POST /api/v1/todos', async () => {
    const [agent] = await registerAndLogin();
    const resp = await agent
      .post('/api/v1/todos')
      .send({ task: 'Test task', user_id: '1' });
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      completed: false,
      created_at: expect.any(String),
      id: expect.any(String),
      task: 'Test task',
      user_id: '1',
    });
  });

  it('PUT /api/v1/todos/:id', async () => {
    const [agent] = await registerAndLogin();
    const resp = await agent
      .put('/api/v1/todos/1')
      .send({ todo_id: 1, mark: 'true' });
    expect(resp.status).toBe(200);
    expect(resp.body.completed).toBe(true);
    const resp2 = await agent
      .put('/api/v1/todos/1')
      .send({ todo_id: 1, mark: 'false' });
    expect(resp2.status).toBe(200);
    expect(resp2.body.completed).toBe(false);
  });

  it('DELETE /api/v1/todos/:id', async () => {
    const [agent, user] = await registerAndLogin();
    const task = 'Test task that needs to be deleted';
    const todo = await Todo.postNewToDo(task, user.id);
    const resp = await agent.delete(`/api/v1/todos/${todo.id}`);
    expect(resp.status).toBe(200);
    const deleteResp = await agent.get(`/api/v1/todos/${todo.id}`);
    expect(deleteResp.status).toBe(403);
  });

  it('PUT /api/v1/todos/edit/:id', async () => {
    const [agent] = await registerAndLogin();
    const resp = await agent
      .post('/api/v1/todos')
      .send({ task: 'Test task', user_id: '1' });
    expect(resp.status).toBe(200);
    const resp2 = await agent
      .post('/api/v1/todos')
      .send({ task: 'Test task is updated', user_id: '1' });
    expect(resp2.status).toBe(200);
    expect(resp2.body.task).toBe('Test task is updated');
  });
});
