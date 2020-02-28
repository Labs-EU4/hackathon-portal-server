const request = require('supertest');
const server = require('../../api/server');
const db = require('../../data/dbConfig');
const mockUsers = require('../../data/mock/auth.mock');
const mockEvents = require('../../data/mock/event.mock');

const app = request(server);
let token;
let token2;
let token3;
let eventId;
let teamMateId;
let categoryId;

beforeEach(async () => {
  await db.raw(
    'TRUNCATE TABLE event_categories, users, event_participants, events, event_team CASCADE'
  );
  const response1 = await app
    .post('/api/auth/register')
    .set('Content-Type', 'application/json')
    .send(mockUsers.validInput1);
  token = response1.body.body.token;

  const response2 = await app
    .post('/api/auth/register')
    .set('Content-Type', 'application/json')
    .send(mockUsers.validInput2);
  token2 = response2.body.body.token;

  const response3 = await app
    .post('/api/auth/register')
    .set('Content-Type', 'application/json')
    .send(mockUsers.existingUsername);
  token3 = response3.body.body.token;

  const response5 = await request(server)
    .post('/api/event-category')
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .send({ category_name: 'Lambda winter hackathon' });
  categoryId = response5.body.body.category_id;

  const eventCreation = await request(server)
    .post('/api/events')
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .send({ ...mockEvents.event1, category_id: categoryId });
  eventId = await eventCreation.body.body.event_id;
});

describe('[POST] user as event owner can ADD/GET/DELETE team members to their event', () => {
  test('event owner can add team mates', async done => {
    const response = await app
      .post(`/api/events/${eventId}/team`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ email: mockUsers.validInput2.email, role_type: 'judge' });
    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('New member added successfully');
    expect(response.body.body.member.role_type).toEqual('judge');
    expect(response.body.body.member.event_id).toEqual(Number(eventId));
    done();
  });
  test('event owner can send invites', async done => {
    const response = await app
      .post(`/api/events/event-teams/invite/${eventId}`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ email: mockUsers.validInput2.email, role_type: 'judge' });
    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('Invite sent successfully');
    done();
  });
  test('[POST] event owner can not add a person that is already in the team', async done => {
    const response4 = await app
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send(mockUsers.validInput3);

    const seedTeam = await app
      .post(`/api/events/${eventId}/team`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ email: mockUsers.validInput3.email, role_type: 'organizer' });
    teamMateId = seedTeam.body.body.member.user_id;

    const response = await app
      .post(`/api/events/${eventId}/team`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ email: mockUsers.validInput3.email, role_type: 'judge' });
    expect(response.status).toEqual(409);
    expect(response.body.message).toEqual('This user is already in the team');
    done();
  });

  test('[POST] event owner can not add themself to a team', async done => {
    const response = await app
      .post(`/api/events/${eventId}/team`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ email: mockUsers.validInput1.email, role_type: 'judge' });

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(
      'You cannot add yourself to your team'
    );
    done();
  });

  test('[POST] none owner can not add a person the team', async done => {
    const response4 = await app
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send(mockUsers.validInput3);

    const seedTeam = await app
      .post(`/api/events/${eventId}/team`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ email: mockUsers.validInput3.email, role_type: 'organizer' });
    teamMateId = seedTeam.body.body.member.user_id;

    const response = await app
      .post(`/api/events/${eventId}/team`)
      .set('Authorization', token2)
      .set('Content-Type', 'application/json')
      .send({ email: mockUsers.validInput3.email, role_type: 'judge' });
    expect(response.status).toEqual(403);
    expect(response.body.message).toEqual('You are not authorized to do this');
    done();
  });

  test('[POST] event owner can not add a participants as judge or organiser', async done => {
    const eventRegister = await app
      .post(`/api/events/${eventId}/participants`)
      .set('Authorization', token3)
      .set('Content-Type', 'application/json');

    const response = await app
      .post(`/api/events/${eventId}/team`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ email: mockUsers.existingUsername.email, role_type: 'judge' });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('This user is a participant');
    done();
  });

  test('[GET] logged in users can get all users in their team', async done => {
    const response = await app
      .get(`/api/events/${eventId}/team`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body.success).toEqual(true);
    done();
  });
  test('[DELETE] event owner can delete a person that is already in the team', async done => {
    const response4 = await app
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send(mockUsers.validInput3);

    const seedTeam = await app
      .post(`/api/events/${eventId}/team`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ email: mockUsers.validInput3.email, role_type: 'organizer' });
    teamMateId = seedTeam.body.body.member.user_id;

    const response = await app
      .delete(`/api/events/${eventId}/team/${teamMateId}`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual('Team member deleted successfully');
    done();
  });
  test('[DELETE] none owner can not delete a person that is in a team', async done => {
    const response4 = await app
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send(mockUsers.validInput3);

    const seedTeam = await app
      .post(`/api/events/${eventId}/team`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ email: mockUsers.validInput3.email, role_type: 'organizer' });
    teamMateId = seedTeam.body.body.member.user_id;

    const response = await app
      .delete(`/api/events/${eventId}/team/${teamMateId}`)
      .set('Authorization', token2)
      .set('Content-Type', 'application/json');
    expect(response.status).toEqual(403);
    expect(response.body.message).toEqual('You are not authorized to do this');
    done();
  });
  test('[DELETE] throw error if user is not in the team', async done => {
    const response4 = await app
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send(mockUsers.validInput3);

    const seedTeam = await app
      .post(`/api/events/${eventId}/team`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send({ email: mockUsers.validInput3.email, role_type: 'organizer' });
    teamMateId = seedTeam.body.body.member.user_id;

    const response = await app
      .delete(`/api/events/${eventId}/team/${teamMateId}`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json');

    const response2 = await app
      .delete(`/api/events/${eventId}/team/${teamMateId}`)
      .set('Authorization', token)
      .set('Content-Type', 'application/json');
    expect(response2.status).toEqual(400);
    expect(response2.body.message).toEqual('This user is not in the team');
    done();
  });
});
