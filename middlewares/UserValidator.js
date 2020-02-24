const bcrypt = require('bcrypt');
const decode = require('jwt-decode');
const checkItem = require('../utils/checkInputs');
const requestHandler = require('../utils/requestHandler');
const userModel = require('../models/userModel');
require('dotenv').config();
const teamModel = require('../models/participantTeamsModels');
const organizerModel = require('../models/eventTeamModel');
const server = require('../api/server');

/**
 * Validates all routes
 * @class UserValidator
 */
module.exports = class UserValidator {
  /**
   * Validates all user details
   * @param {obj} req
   * @param {obj} res
   * @param {obj} next
   * @returns {obj} Validation error messages or contents of req.body
   */
  static async userInput(req, res, next) {
    const { email, password } = req.body;
    const { id } = req.params;
    const { role } = req.query;
    const check = checkItem({
      email,
      password
    });
    if (Object.keys(check).length > 0) {
      return res.status(400).json({
        statusCode: 400,
        check
      });
    }
    const userEmail = await userModel.getUserBy({ email });
    let existingUser;
    if (userEmail !== undefined) {
      existingUser = `email ${email}`;
    }
    if (existingUser) {
      return requestHandler.error(
        res,
        409,
        `User with ${existingUser} already exist`
      );
    }

    const hash = await bcrypt.hash(password, 15);
    const newUser = await userModel.addUser({
      email,
      password: hash
    });
    // eslint-disable-next-line require-atomic-updates
    req.newuser = newUser;
    next();
  }

  static async userLogin(req, res, next) {
    const { password, email } = req.body;
    try {
      const check = checkItem({
        email,
        password
      });
      if (Object.keys(check).length > 0) {
        return res.status(400).json({
          statusCode: 400,
          check
        });
      }
      const returnUser = await userModel.getUserBy({ email });

      if (returnUser && returnUser.password) {
        const checkPassword = await bcrypt.compareSync(
          password,
          returnUser.password
        );
        if (returnUser && checkPassword) {
          // eslint-disable-next-line require-atomic-updates
          req.checked = returnUser;
          next();
        }
      }

      return requestHandler.error(res, 400, 'wrong credentials');
    } catch (err) {
      return err;
    }
  }

  static async userProfile(req, res, next) {
    try {
      const { email, username, fullname, bio } = req.body;
      const check = checkItem({
        email,
        username,
        fullname,
        bio
      });
      if (Object.keys(check).length > 0) {
        return requestHandler.error(res, 400, check);
      }
      next();
    } catch (error) {
      return error;
    }
  }

  static async inviteInput(req, res, next) {
    try {
      const { email } = req.body;
      const { id } = req.params;
      const check = checkItem({
        email
      });
      if (Object.keys(check).length > 0) {
        return requestHandler.error(res, 400, check);
      }
      if (id) {
        next();
      }
      const checkUser = await userModel.getUserBy({ email });
      if (!checkUser || Object.keys(checkUser).length === 0) {
        return requestHandler.error(
          res,
          401,
          'This email is either incorrect or not registered'
        );
      }
      req.checked = { email: checkUser.email, id: checkUser.id };
      next();
    } catch (error) {
      return error;
    }
  }

  static async validateToken(req, res, next) {
    try {
      const token = await server.locals;
      if (token) {
        const { __uid } = decode(token);
        req.token = __uid;
        next();
      } else {
        return requestHandler.error(res, 400, `Email is invalid`);
      }
    } catch (error) {
      return error;
    }
  }
};
