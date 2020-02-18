/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
const db = require('../../models/eventCategoryModel');
const requestHandler = require('../../utils/requestHandler');

function handleCategoriesDelete(req, res) {
  const { id } = req.params;
  db.remove(id)
    .then(() => {
      return requestHandler.success(
        res,
        200,
        'your event category was deleted successfully!'
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, `server error ${error.message}`);
    });
}

function handleCategoriesEdit(req, res) {
  const { id } = req.params;
  const editedCategory = {
    category_name: req.body.category_name
  };
  db.update(id, editedCategory)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'your event category was edited successfully!',
        { category: data }
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, `server error ${error.message}`);
    });
}

function handleCategoriesPost(req, res) {
  const category = req.body;
  db.add(category)
    .then(data => {
      return requestHandler.success(
        res,
        201,
        'your event category was added successfully!',
        { category_id: Number(data.toString()) }
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, `server error ${error.message}`);
    });
}

function handleCategoriesGet(req, res) {
  db.find()
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'All Categories retrieved Successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, `server error ${error.message}`);
    });
}

module.exports = {
  handleCategoriesDelete,
  handleCategoriesEdit,
  handleCategoriesPost,
  handleCategoriesGet
};
