const request = require('supertest');
const jwtDecode = require('jwt-decode');
const server = require('../../api/server');
const db = require('../../data/dbConfig');
const mockEvents = require('../../data/mock/event.mock');
const mockCategory = require('../../data/mock/categories.mock');
const mockProjects = require('../../data/mock/projects.mock');
const mockGrading = require('../../data/mock/projectGrading.mock');
const mockUser = require('../../data/mock/auth.mock');
const mockParticipantTeams = require('../../data/mock/participantTeams');

const app = request(server);

let token;
let eventId;
let particpanToken1;
let particpanToken2;
let particpanToken3;
let teamId;
let teamArray;

beforeEach(async () => {
  await db.raw(
    'TRUNCATE TABLE event_categories,users,events, participant_team_members, participant_teams  CASCADE'
  );
  // eslint-disable-next-line no-unused-vars
  const response = await app
    .post('/api/auth/register')
    .set('Content-Type', 'application/json')
    .send(mockUser.validInput1);
  token = await response.body.body.token;

  const response5 = await app
    .post('/api/event-category')
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .send(mockCategory.cat1);
  // expect(response5.status).toEqual(201);
  const categoryId = await response5.body.body.category_id;
  const response3 = await app
    .post('/api/events')
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .send({
      ...mockEvents.event1,
      category_id: categoryId
    });
  // expect(response3.status).toEqual(201);
  eventId = await response3.body.body.event_id;
  const response11 = await app
    .post('/api/auth/register')
    .set('Content-Type', 'application/json')
    .send(mockParticipantTeams.participant1);
  // expect(response11.status).toEqual(201);
  particpanToken1 = await response11.body.body.token;

  const response12 = await app
    .post('/api/auth/register')
    .set('Content-Type', 'application/json')
    .send(mockParticipantTeams.participant2);
  particpanToken2 = await response12.body.body.token;
  const teamRegister = await app
    .post(`/api/events/${eventId}/participant-teams`)
    .set('Authorization', particpanToken1)
    .set('Content-Type', 'application/json')
    .send(mockParticipantTeams.teamName1);
  teamArray = teamRegister.body.body;
  teamArray.map(team => {
    teamId = team.id;
    return teamId;
  });
});

describe('participants  can [POST, GET, PUT, DELETE] a team and teammates', () => {
  test('[POST] participant can create a team and add a teammate', async done => {
    const teamRegister2 = await app
      .post(`/api/events/${eventId}/participant-teams`)
      .set('Authorization', particpanToken1)
      .set('Content-Type', 'application/json')
      .send(mockParticipantTeams.teamName2);
    expect(teamRegister2.status).toEqual(201);
    const { userId } = jwtDecode(particpanToken2);
    const teamMateRegister = await app
      .post(`/api/events/participant-teams/${teamId}`)
      .set('Authorization', particpanToken1)
      .set('Content-Type', 'application/json')
      .send({ team_member: userId });
    expect(teamMateRegister.status).toEqual(201);
    done();
  });
  test('[GET] participant can get created  team by event id', async done => {
    const getAllTeam = await app
      .get(`/api/events/${eventId}/participant-teams`)
      .set('Authorization', particpanToken1)
      .set('Content-Type', 'application/json');
    expect(getAllTeam.status).toEqual(200);
    done();
  });
  test('[GET] participant can get created  team by team id', async done => {
    const getTeam = await app
      .get(`/api/events//participant-teams/${teamId}`)
      .set('Authorization', particpanToken1)
      .set('Content-Type', 'application/json');
    expect(getTeam.status).toEqual(200);
    done();
  });
  test('[GET] participant can get teammates by team id', async done => {
    const getTeam = await app
      .get(`/api/events//participant-teams/${teamId}/members`)
      .set('Authorization', particpanToken1)
      .set('Content-Type', 'application/json');
    expect(getTeam.status).toEqual(200);
    done();
  });
  test('[PUT] participant can edit created  team', async done => {
    const teamRegister2 = await app
      .post(`/api/events/${eventId}/participant-teams`)
      .set('Authorization', particpanToken1)
      .set('Content-Type', 'application/json')
      .send(mockParticipantTeams.teamName2);
    expect(teamRegister2.status).toEqual(201);
    const { userId } = jwtDecode(particpanToken2);

    const teamMateRegister = await app
      .post(`/api/events/participant-teams/${teamId}`)
      .set('Authorization', particpanToken1)
      .set('Content-Type', 'application/json')
      .send({ team_member: userId });
    expect(teamMateRegister.status).toEqual(201);
    const teamEdit = await app
      .put(`/api/events/participant-teams/${teamId}`)
      .set('Authorization', particpanToken1)
      .set('Content-Type', 'application/json')
      .send({ ...mockParticipantTeams.teamNameEdit, event_id: eventId });
    expect(teamEdit.status).toEqual(201);
    done();
  });
  test('[DELETE] participant can delete teammates', async done => {
    const { userId } = jwtDecode(particpanToken2);
    const teamMateRegister = await app
      .post(`/api/events/participant-teams/${teamId}`)
      .set('Authorization', particpanToken1)
      .set('Content-Type', 'application/json')
      .send({ team_member: userId });
    expect(teamMateRegister.status).toEqual(201);
    const teamDelete = await app
      .delete(`/api/events/participant-teams/member/${userId}`)
      .set('Authorization', particpanToken1)
      .set('Content-Type', 'application/json');
    expect(teamDelete.status).toEqual(200);
    done();
  });
  test('[DELETE] participant can delete created  team', async done => {
    const teamDelete = await app
      .delete(`/api/events/participant-teams/${teamId}`)
      .set('Authorization', particpanToken1)
      .set('Content-Type', 'application/json');
    expect(teamDelete.status).toEqual(200);
    done();
  });
});
