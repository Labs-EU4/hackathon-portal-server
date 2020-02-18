const { Router } = require('express');
const passport = require('passport');
const authRoutes = require('./auth');
const eventRoutes = require('./events');
const categoriesRoutes = require('./categories.js');
const usersRoutes = require('./users');
const { googleAuthStrategy } = require('../api/auth/googleStrategy');
const { githubAuthStrategy } = require('../api/auth/githubStrategy');

const router = Router();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

googleAuthStrategy();
githubAuthStrategy();

router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/event-category', categoriesRoutes);
router.use('/users', usersRoutes);

module.exports = router;
