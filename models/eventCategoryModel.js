/* eslint-disable no-use-before-define */
const db = require('../data/dbConfig');

module.exports = {
  add,
  find,
  remove,
  update,
  findById,
  findByTitle
};

async function findByTitle(categoryName) {
  const foundTitle = await db('event_categories').where({
    category_name: categoryName
  });
  return foundTitle;
}

async function findById(id) {
  const eventId = await db('event_categories').where({ id });
  return eventId;
}

async function update(id, category) {
  const eventUpdate = await db('event_categories')
    .where({ id })
    .update(category)
    .returning('*')
    .then(newCategory => newCategory[0]);
  return eventUpdate;
}

async function remove(id) {
  const eventId = await db('event_categories')
    .where({ id })
    .delete();
  return eventId;
}

async function add(category) {
  const eventCategory = await db('event_categories')
    .insert(category)
    .returning('id');
  return eventCategory;
}

async function find() {
  const foundEvent = await db('event_categories');
  return foundEvent;
}
