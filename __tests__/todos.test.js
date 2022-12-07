const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

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

  it.only('POST /api/v1/todos', async () => {
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
});
