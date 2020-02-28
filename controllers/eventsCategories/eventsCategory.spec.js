const request = require('supertest');
const server = require('../../api/server');
const db = require('../../data/dbConfig');

let token;

const addUser = {
  email: 'test@email.com',
  password: 'test1234'
};

beforeEach(async () => {
  await db.raw('TRUNCATE TABLE event_categories,users, events CASCADE');
  // eslint-disable-next-line no-unused-vars
  const response = await request(server) // creates new user before each test
    .post('/api/auth/register')
    .set('Content-Type', 'application/json')
    .send(addUser);
  token = response.body.body.token;
});

describe('user can add/edit/delete/get an event category', () => {
  test('[POST] /event-category', async () => {
    const response3 = await request(server)
      .post('/api/event-category')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_name: 'Lambda winter hackathon' });
    expect(response3.status).toBe(201);
  });
  test('[GET] /event-category', async () => {
    const response3 = await request(server)
      .get('/api/event-category')
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response3.status).toBe(200);
  });
  test('[PUT] /event-category', async () => {
    const response3 = await request(server)
      .post('/api/event-category')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_name: 'Lambda winter hackathon' });
    expect(response3.status).toBe(201);
    const categoryId = response3.body.body.category_id;
    const response4 = await request(server)
      .put(`/api/event-category/${categoryId}`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_name: 'Kenya Innovation hackathon' });
    expect(response4.status).toBe(200);
  });
  test('[DELETE] /event-category', async () => {
    const response3 = await request(server)
      .post('/api/event-category')
      .set('Authorization', token)
      .send({ category_name: 'Lambda winter hackathon' });
    expect(response3.status).toBe(201);
    const categoryId = response3.body.body.category_id;
    const response4 = await request(server)
      .delete(`/api/event-category/${categoryId}`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response4.status).toBe(200);
  });

  test('[DELETE] /event-category will fail if ID is not in database', async () => {
    const response3 = await request(server)
      .post('/api/event-category')
      .set('Authorization', token)
      .send({ category_name: 'Lambda winter hackathon' });
    expect(response3.status).toBe(201);
    const categoryId = response3.body.body.category_id;
    const response4 = await request(server)
      .delete(`/api/event-category/${categoryId + 1}`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response4.status).toBe(404);
    expect(response4.body.message).toStrictEqual(
      'This event category id cannot be found,please provide a valid event category id'
    );
  });

  test('[DELETE] /event-category will fail if provided ID is not a number', async () => {
    const response3 = await request(server)
      .post('/api/event-category')
      .set('Authorization', token)
      .send({ category_name: 'Lambda winter hackathon' });
    expect(response3.status).toBe(201);
    const response4 = await request(server)
      .delete(`/api/event-category/awesomeness`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response4.status).toBe(400);
    expect(response4.body.message).toStrictEqual({
      id: 'Please provide a valid id,an id can only be a number'
    });
  });

  test('[PUT] /event-category will fail if ID is not in database', async () => {
    const response3 = await request(server)
      .post('/api/event-category')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_name: 'Lambda winter hackathon' });
    expect(response3.status).toBe(201);
    const categoryId = response3.body.body.category_id;
    const response4 = await request(server)
      .put(`/api/event-category/${categoryId + 1}`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_name: 'Kenya Innovation hackathon' });
    expect(response4.status).toBe(404);
    expect(response4.body.message).toStrictEqual(
      'This event category id cannot be found,please provide a valid event category id'
    );
  });
  test('[PUT] /event-category will fail if provided ID is not a number', async () => {
    const response3 = await request(server)
      .post('/api/event-category')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_name: 'Lambda winter hackathon' });
    expect(response3.status).toBe(201);
    // eslint-disable-next-line no-unused-vars
    const categoryId = response3.body.category_id;
    const response4 = await request(server)
      .put(`/api/event-category/awesomeness`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_name: 'Kenya Innovation hackathon' });
    expect(response4.status).toBe(400);
    expect(response4.body.message).toStrictEqual({
      id: 'Please provide a valid id,an id can only be a number'
    });
  });
  test('[PUT] /event-category will fail if property provided is wrong', async () => {
    const response3 = await request(server)
      .post('/api/event-category')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_names: 'Lambda winter hackathon' });
    expect(response3.status).toBe(500);
  });
  test('[POST] /event-category will fail if category name exists in the DB', async () => {
    const response3 = await request(server)
      .post('/api/event-category')
      .set('authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_name: 'Lambda winter hackathon' });
    expect(response3.status).toBe(201);
    const response4 = await request(server)
      .post('/api/event-category')
      .set('authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_name: 'Lambda winter hackathon' });
    expect(response4.status).toBe(409);
    expect(response4.body.message).toStrictEqual(
      'This category name already exists in the database, please pick a new category name!'
    );
  });
});
