const server = require('../api/server');
const db = require('../models/userModel');
const { generateToken } = require('../utils/generateToken');

const redirectUrl = process.env.REDIRECT_URL;

const socialAuth = async (req, res) => {
  try {
    const data = req.user.profile;
    if (!data) {
      res.status(400).json({
        ErrorMessage: 'Authentication Failed'
      });
    }
    if (server.locals.authType === 'Google') {
      res.redirect(`${redirectUrl}/register?google=true`);
    }
    res.redirect(`${redirectUrl}/register?github=true`); // redirect with the token so that the frontend can extract it for user details
  } catch (error) {
    return error;
  }
};

const getAuthToken = async (req, res) => {
  try {
    const data = server.locals;
    if (!data) {
      res.status(400).json({
        statusCode: 400,
        message: 'Authentication Failed'
      });
    }
    const user = await db.createOrFindUser(data);
    if (user) {
      req.user = server.locals;
      generateToken(
        res,
        200,
        `${req.user.authType} Login was successfull`,
        user
      );
    }
  } catch (error) {
    return error;
  }
};

module.exports = { socialAuth, getAuthToken };
