const request = require('supertest');
const server = require('./server');

describe('server', () => {
  it('[GET] / WORKS!', async () => {
    const res = await request(server)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body).toEqual({
      status: 200,
      message: 'Hello from Hackton backend!'
    });
  });
  it('[GET] / Fails!', done => {
    return request(server)
      .get('/wrong')
      .expect(404)
      .end(done);
  });
});
