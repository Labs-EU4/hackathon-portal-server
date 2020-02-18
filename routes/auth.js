const { Router } = require('express');
const passport = require('passport');
const UserValidator = require('../middlewares/UserValidator');
const {
  register,
  Login,
  passwordReset,
  newPassword,
  confirmEmail
} = require('../controllers/authUser/authControllers');
const { getAuthToken, socialAuth } = require('../controllers/Oauth');

const router = Router();

/**
 * User Registration and Login Routes
 */
router.post('/register', UserValidator.userInput, register);

router.post('/register/:id', UserValidator.userInput, register);

router.post('/login', UserValidator.userLogin, Login);

router.route('/forgotpassword').post(UserValidator.inviteInput, passwordReset);
router.route('/resetpassword').patch(UserValidator.validateToken, newPassword);
router.route('/verify_email').post(UserValidator.validateToken, confirmEmail);

// Passportjs config
router.use(passport.initialize());

/**
 * Google auth route
 */
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  socialAuth
);

/**
 * Github auth route
 */
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['profile', 'email']
  }),
  socialAuth
);

/**
 * get google or github auth on frontend securely
 */
router.get('/token', getAuthToken);

module.exports = router;
