const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const db = require('../../models/userModel');

const server = require('../../api/server');

const baseUrl = process.env.BASE_URL;

module.exports = {
  githubAuthStrategy() {
    passport.use(
      new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL: `${baseUrl}/api/auth/github` || process.env.LOCAL_URL_GIT
        },
        async (accessToken, refreshToken, profile, done) => {
          const { id, username, _json } = profile;

          const userCredentials = {
            id,
            fullname: _json.name,
            username,
            email: _json.email || id,
            password: process.env.OAUTH_DEFAULT_PWD
          };
          const user = await db.createOrFindUser(userCredentials);
          server.locals = user;
          server.locals.authType = 'Github';

          done(null, {
            accessToken,
            refreshToken,
            profile
          });
        }
      )
    );
  }
};
