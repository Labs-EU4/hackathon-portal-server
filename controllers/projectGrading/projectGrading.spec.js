const request = require('supertest');
const server = require('../../api/server');
const db = require('../../data/dbConfig');
const mockEvents = require('../../data/mock/event.mock');
const mockCategory = require('../../data/mock/categories.mock');
const mockProjects = require('../../data/mock/projects.mock');
const mockGrading = require('../../data/mock/projectGrading.mock');
const mockUser = require('../../data/mock/auth.mock');

const app = request(server);

let token;
let projectId;
let judgeToken;
let eventId;
let projectGradeId;
let particpanToken;

beforeEach(async () => {
  await db.raw(
    'TRUNCATE TABLE event_categories,users,events,project_entries,project_grading, event_team, event_participants CASCADE'
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
    .send(mockGrading.judge1);
  // expect(response11.status).toEqual(201);
  judgeToken = await response11.body.body.token;
  const response6 = await app
    .post(`/api/events/${eventId}/team`)
    .set('Authorization', token)
    .set('Content-Type', 'application/json')
    .send(mockGrading.teammate1);
  // expect(response6.status).toEqual(200);

  const response12 = await app
    .post('/api/auth/register')
    .set('Content-Type', 'application/json')
    .send(mockGrading.participant1);
  particpanToken = await response12.body.body.token;
  const eventRegister = await app
    .post(`/api/events/${eventId}/participants`)
    .set('Authorization', particpanToken)
    .set('Content-Type', 'application/json');
  // expect(eventRegister.status).toEqual(201);

  const response7 = await app
    .post(`/api/events/${eventId}/projects`)
    .set('Authorization', particpanToken)
    .set('Content-Type', 'application/json')
    .send(mockProjects.submission2);
  // expect(response7.status).toEqual(201);

  const projectArray = await response7.body.body;
  await projectArray.map(project => {
    projectId = project.id;

    return projectId;
  });
});

describe('judges can [POST, GET, PUT, DELETE] grade a submitted project', () => {
  test('[POST] judges can add grades', async done => {
    const response13 = await app
      .post(`/api/events/projects/${projectId}/grading`)
      .set('Authorization', judgeToken)
      .set('Content-Type', 'application/json')
      .send({
        ...mockGrading.projectGrade1,
        project_event_id: eventId
      });
    expect(response13.status).toEqual(201);
    done();
  });
  test('[PUT] judges can update grades', async done => {
    const response13 = await app
      .post(`/api/events/projects/${projectId}/grading`)
      .set('Authorization', judgeToken)
      .set('Content-Type', 'application/json')
      .send({
        ...mockGrading.projectGrade1,
        project_event_id: eventId
      });
    expect(response13.status).toEqual(201);

    const projectGradeArray = response13.body.body;
    projectGradeArray.map(project => {
      projectGradeId = project.project_id;

      return projectGradeId;
    });
    const response14 = await app
      .put(`/api/events/projects/${projectGradeId}/grading`)
      .set('Authorization', judgeToken)
      .set('Content-Type', 'application/json')
      .send({
        ...mockGrading.projectGrade2,
        project_event_id: eventId
      });
    expect(response14.status).toEqual(200);
    done();
  });

  test('[DELETE] judges can DELETE grades', async done => {
    const response13 = await app
      .post(`/api/events/projects/${projectId}/grading`)
      .set('Authorization', judgeToken)
      .set('Content-Type', 'application/json')
      .send({
        ...mockGrading.projectGrade1,
        project_event_id: eventId
      });
    expect(response13.status).toEqual(201);

    const projectGradeArray = response13.body.body;
    projectGradeArray.map(project => {
      projectGradeId = project.project_id;

      return projectGradeId;
    });
    const response14 = await app
      .delete(`/api/events/projects/${projectGradeId}/grading`)
      .set('Authorization', judgeToken)
      .set('Content-Type', 'application/json');
    expect(response14.status).toEqual(200);
    done();
  });
  test('[GET] judges can GET grades', async done => {
    const response13 = await app
      .post(`/api/events/projects/${projectId}/grading`)
      .set('Authorization', judgeToken)
      .set('Content-Type', 'application/json')
      .send({
        ...mockGrading.projectGrade1,
        project_event_id: eventId
      });
    expect(response13.status).toEqual(201);

    const projectGradeArray = response13.body.body;
    projectGradeArray.map(project => {
      projectGradeId = project.project_id;

      return projectGradeId;
    });
    const response14 = await app
      .get(`/api/events/projects/${projectGradeId}/grading`)
      .set('Authorization', judgeToken)
      .set('Content-Type', 'application/json');
    expect(response14.status).toEqual(200);
    const response15 = await app
      .get(`/api/events/${eventId}/projects/grading`)
      .set('Authorization', judgeToken)
      .set('Content-Type', 'application/json');
    expect(response15.status).toEqual(200);
    done();
  });
  test('Check if projectId is a number', () => {
    expect(eventId).toBeNumber();
  });
  test('Check if eventId is a number', () => {
    expect(eventId).toBeNumber();
  });
});
