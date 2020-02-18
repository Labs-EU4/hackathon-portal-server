/* eslint-disable camelcase */
const checkItem = require('../utils/checkInputs');
const requestHandler = require('../utils/requestHandler');
const categoriesModel = require('../models/eventCategoryModel');
require('dotenv').config();

/**
 * Validates all routes
 * @class CategoryValidator
 */
module.exports = class CategoryValidator {
  /**
   * Validates all event details
   * @param {obj} req
   * @param {obj} res
   * @param {obj} next
   * @returns {obj} Validation error messages or contents of req.body
   */
  static async validateID(req, res, next) {
    // validates provided ID is a number
    const { id } = req.params;
    const check = checkItem({ id });

    if (Object.keys(check).length > 0) {
      return requestHandler.error(res, 400, check);
    }
    categoriesModel
      .findById(id)
      .then(data => {
        if (data.length === 0) {
          return requestHandler.error(
            res,
            404,
            'This event category id cannot be found,please provide a valid event category id'
          );
        }
        req.event = data;
        return next();
      })
      .catch(error => {
        return requestHandler.error(res, 500, `Server error ${error}`);
      });
  }

  static async categoryValidation(req, res, next) {
    try {
      const { id } = req.params;
      const { category_name } = req.body;

      if (!id) {
        const exists = await categoriesModel.findByTitle(category_name);
        if (exists.length !== 0) {
          return requestHandler.error(
            res,
            409,
            'This category name already exists in the database, please pick a new category name!'
          );
        }
      }

      const check = checkItem({
        category_name
      });

      if (Object.keys(check).length > 0) {
        return requestHandler.error(res, 400, check);
      }
      return next();
    } catch (error) {
      return requestHandler.error(res, 500, `Server error ${error}`);
    }
  }
};
