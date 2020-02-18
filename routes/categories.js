const { Router } = require('express');
const {
  handleCategoriesDelete,
  handleCategoriesEdit,
  handleCategoriesPost,
  handleCategoriesGet
} = require('../controllers/eventsCategories/categoryControllers');
const CategoryValidator = require('../middlewares/CategoryValidator');
const authenticate = require('../api/auth/authenticate');

const router = Router();

router.post(
  '/',
  authenticate,
  CategoryValidator.categoryValidation,
  handleCategoriesPost
);
router.get('/', authenticate, handleCategoriesGet);
router.put(
  '/:id',
  authenticate,
  CategoryValidator.validateID,
  handleCategoriesEdit
);
router.delete(
  '/:id',
  authenticate,
  CategoryValidator.validateID,
  handleCategoriesDelete
);

module.exports = router;
