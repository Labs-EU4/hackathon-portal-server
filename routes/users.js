/* eslint-disable no-use-before-define */
const { Router } = require('express');
const authenticate = require('../api/auth/authenticate');
const {
  handleGetUserList,
  handleGetSingleUser,
  updateUserProfile
} = require('../controllers/users/userController');
const UserValidator = require('../middlewares/UserValidator');
const upload = require('../config/cloudinary');


const router = Router();

router.get('/', authenticate, handleGetUserList);
router.get('/:id', authenticate, handleGetSingleUser);
router.get('/search', authenticate, handleGetSingleUser);
router.put(
  '/profile',
  authenticate,
  upload.single('image_url'),
  UserValidator.userProfile,
  updateUserProfile
);

module.exports = router;
