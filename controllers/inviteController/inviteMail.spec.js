const server = require('../../api/server');
// eslint-disable-next-line import/order
const request = require('supertest')(server);
const inviteMail = require('./inviteMail');

const { participantInvite } = inviteMail;

describe('InviteMail Tests', () => {
  describe('participantInvite function', () => {
    test('Returns a promise', async () => {
      const req = {
        params: {
          id: 1
        },
        body: {
          email: 'testmail@test.com'
        }
      };
      const res = {
        status(statusCode) {
          return {
            json() {}
          };
        }
      };
      const isPromise = typeof participantInvite(req, res).then === 'function';
      expect(isPromise).toBeTruthy();
    });
  });
});
