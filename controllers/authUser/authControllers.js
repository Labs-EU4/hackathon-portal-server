const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/generateToken');
const requestHandler = require('../../utils/requestHandler');
const Mailer = require('../../utils/mailHandler');
const checkItem = require('../../utils/checkInputs');
const userModel = require('../../models/userModel');

const register = (req, res) => {
  // endpoint to register
  try {
    const newUser = req.newuser;
    const { id } = req.params;
    if (id) {
      Mailer.confirmEmail(newUser, `login`);
      generateToken(
        res,
        201,
        'You are successfully signed up to hackathon',
        newUser
      );
    } else {
      Mailer.confirmEmail(newUser, `register`);
      generateToken(res, 201, 'Signup succesful', newUser);
    }
  } catch (err) {
    return requestHandler.error(res, 500, `server error ${err.message}`);
  }
};

const Login = (req, res) => {
  // login endpoint
  try {
    const payload = req.checked;
    if (payload.verified) {
      generateToken(res, 200, 'Login succesful', payload);
    } else {
      Mailer.confirmEmail(payload, `login`);
      generateToken(
        res,
        200,
        `Login succesful. Email not verified.
        An email verification message has been sent to this email.`,
        payload
      );
    }
  } catch (err) {
    return requestHandler.error(res, 500, `server error ${err}`);
  }
};

const passwordReset = async (req, res) => {
  try {
    const user = req.checked;
    return Mailer.forgotPassword(
      res,
      200,
      'A reset password token has been sent to this email',
      user
    );
  } catch (err) {
    return requestHandler.error(res, 500, `server error ${err}`);
  }
};

const newPassword = async (req, res) => {
  try {
    const id = await req.token;
    if (id) {
      const { password } = req.body;
      const check = checkItem({ password });
      if (Object.keys(check).length > 0) {
        return requestHandler.error(res, 400, check);
      }
      const hash = await bcrypt.hash(password, 15);
      const foundUser = userModel.getSingleUser({ id });
      if (foundUser) {
        await userModel.updateUser({ password: hash }, id);
        return Mailer.resetPassword(
          res,
          200,
          'Your Password Has Been Updated Successfully',
          foundUser.email
        );
      }
    }
    return requestHandler.error(res, 400, `reset password token not available`);
  } catch (err) {
    return requestHandler.error(res, 500, `server error ${err}`);
  }
};

const confirmEmail = async (req, res) => {
  try {
    const id = await req.token;
    if (id) {
      const foundUser = await userModel.getSingleUser({ id });
      if (foundUser) {
        await userModel.confirmEmail(id);
        return generateToken(
          res,
          200,
          `User with email ${foundUser.email} has been verified`,
          { id }
        );
      }
    }
    return false;
  } catch (err) {
    return requestHandler.error(res, 500, `server error ${err}`);
  }
};

module.exports = {
  register,
  Login,
  passwordReset,
  newPassword,
  confirmEmail
};
