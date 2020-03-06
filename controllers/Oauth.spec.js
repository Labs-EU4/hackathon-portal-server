const server = require('../api/server');
// eslint-disable-next-line import/order
const request = require('supertest')(server);
const Oauth = require('./Oauth');

const { socialAuth, getAuthToken } = Oauth;

describe('Oauth.js Tests', () => {
  describe('socialAuth function', () => {
    test('Returns a promise', async () => {
      const req = {};
      const res = {
        status(statusCode) {
          return {
            json() {}
          };
        }
      };
      const isPromise = typeof socialAuth(req, res).then === 'function';
      expect(isPromise).toBeTruthy();
    });
  });

  describe('getAuthToken function', () => {
    test('Returns a promise', async () => {
      const req = {};
      const res = {
        status(statusCode) {
          return {
            json() {}
          };
        }
      };
      const isPromise = typeof getAuthToken(req, res).then === 'function';
      expect(isPromise).toBeTruthy();
    });
  });
});
