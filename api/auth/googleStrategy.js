const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('../../models/userModel');

const server = require('../../api/server');

const baseUrl = process.env.BASE_URL;

module.exports = {
  googleAuthStrategy() {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL:
            `${baseUrl}/api/auth/google/callback` || process.env.LOCAL_URL_GG
        },
        async (accessToken, refreshToken, profile, done) => {
          const userCredentials = {
            username: profile.name.givenName,
            password: process.env.OAUTH_DEFAULT_PWD,
            email: profile.emails[0].value,
            fullname: profile.displayName
          };
          const user = await db.createOrFindUser(userCredentials);
          server.locals = user;
          server.locals.authType = 'Google';
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
