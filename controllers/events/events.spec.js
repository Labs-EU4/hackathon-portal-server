const request = require('supertest');
const server = require('../../api/server');
const db = require('../../data/dbConfig');
const eventMock = require('../../data/mock/event.mock');

let token;

const { event1, event2, event3ShortDescription } = eventMock;

const addUser = {
  email: 'test2@email.com',
  password: 'test1234'
};

beforeEach(async () => {
  await db.raw('TRUNCATE TABLE event_categories,users, events CASCADE');
  // eslint-disable-next-line no-unused-vars
  const response = await request(server)
    .post('/api/auth/register')
    .set('Content-Type', 'application/json')
    .send(addUser);
  token = response.body.body.token;
});

describe('user can add, edit, delete and get an event', () => {
  test('user can [POST] /events', async () => {
    const response5 = await request(server)
      .post('/api/event-category')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_name: 'Lambda winter hackathon' });
    expect(response5.status).toBe(201);
    const categoryId = response5.body.body.category_id;
    const response3 = await request(server)
      .post('/api/events')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ ...event1, category_id: categoryId });
    expect(response3.status).toBe(201);
  });
  test('user can [GET] /events', async () => {
    const response3 = await request(server)
      .get('/api/events')
      .set('Authorization', token);
    expect(response3.status).toBe(200);
  });
  test('user can [PUT] /events', async () => {
    const response5 = await request(server)
      .post('/api/event-category')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_name: 'Lambda winter hackathon' });
    expect(response5.status).toBe(201);
    const categoryId = response5.body.body.category_id;
    const response3 = await request(server)
      .post('/api/events')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ ...event1, category_id: categoryId });
    expect(response3.status).toBe(201);
    const eventId = response3.body.body.event_id;
    const response4 = await request(server)
      .put(`/api/events/${eventId}`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ ...event2, category_id: categoryId });
    expect(response4.status).toBe(200);
  });
  test('user can [DELETE] /events', async () => {
    const response5 = await request(server)
      .post('/api/event-category')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_name: 'Lambda winter hackathon' });
    expect(response5.status).toBe(201);
    const categoryId = response5.body.body.category_id;
    const response3 = await request(server)
      .post('/api/events')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ ...event1, category_id: categoryId });
    expect(response3.status).toBe(201);
    const eventId = response3.body.body.event_id;
    const response4 = await request(server)
      .delete(`/api/events/${eventId}`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response4.status).toBe(200);
  });
  test('[POST] /events will fail if event description or guidelines is missing a property', async () => {
    const response5 = await request(server)
      .post('/api/event-category')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_name: 'Lambda winter hackathon' });
    expect(response5.status).toBe(201);
    const categoryId = response5.body.body.category_id;
    const response3 = await request(server)
      .post('/api/events')
      .set('Authorization', token)
      .send({ ...event1, category_id: categoryId, guidelines: undefined });
    expect(response3.status).toBe(400);
  });
  test('[POST] /events will fail if event descriptions and guidelines is less than 50 characters', async () => {
    const response5 = await request(server)
      .post('/api/event-category')
      .set('authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_name: 'Lambda winter hackathon' });
    expect(response5.status).toBe(201);
    const categoryId = response5.body.body.category_id;
    const response3 = await request(server)
      .post('/api/events')
      .set('authorization', token)
      .send({
        ...event1,
        category_id: categoryId,
        event_title: 'W',
        event_description: 'Short',
        guidelines: 'Short'
      });

    expect(response3.status).toBe(400);
    expect(response3.body.message).toStrictEqual({
      event_title: 'event_title must be between 10 to 50 characters',
      event_description:
        'event_description must be between 10 to 100 characters',
      guidelines: 'guidelines must be between 10 to 100 characters'
    });
  });
  test('[POST] /events will fail if participation type is not individual,team or both', async () => {
    const response5 = await request(server)
      .post('/api/event-category')
      .set('authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_name: 'Lambda winter hackathon' });
    expect(response5.status).toBe(201);
    const categoryId = response5.body.body.category_id;
    const response3 = await request(server)
      .post('/api/events')
      .set('authorization', token)
      .set('Content-Type', 'application/json')
      .send({
        ...event1,
        category_id: categoryId,
        participation_type: 'any'
      });
    expect(response3.status).toBe(400);
    expect(response3.body.message).toStrictEqual({
      participation_type:
        "please pick between these three options for participation type ['individual','team','both']"
    });
  });
  test('[POST] /events will fail if event title already exists in the database', async () => {
    const response5 = await request(server)
      .post('/api/event-category')
      .set('authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_name: 'Lambda winter hackathon' });
    expect(response5.status).toBe(201);
    const categoryId = response5.body.body.category_id;
    const response3 = await request(server)
      .post('/api/events')
      .set('authorization', token)
      .set('Content-Type', 'application/json')
      .send({ ...event1, category_id: categoryId });

    expect(response3.status).toBe(201);
    const response4 = await request(server)
      .post('/api/events')
      .set('authorization', token)
      .set('Content-Type', 'application/json')
      .send({ ...event1, category_id: categoryId });

    expect(response4.status).toBe(409);
    expect(response4.body.message).toStrictEqual(
      'This event title already exists in the database, please pick a new event title!'
    );
  });
  test('[GET] /events/user-events for each logged in user', async () => {
    const response5 = await request(server)
      .post('/api/event-category')
      .set('authorization', token)
      .set('Content-Type', 'application/json')
      .send({ category_name: 'Lambda winter hackathon' });
    expect(response5.status).toBe(201);
    const categoryId = response5.body.body.category_id;
    const response3 = await request(server)
      .post('/api/events')
      .set('authorization', token)
      .set('Content-Type', 'application/json')
      .send({ ...event1, category_id: categoryId });
    expect(response3.status).toBe(201);
    const response4 = await request(server)
      .get('/api/events/user-events')
      .set('authorization', token)
      .set('Content-Type', 'application/json');
    expect(response4.status).toBe(200);
  });
});
