/* eslint-disable func-names */
exports.up = function(knex) {
  return knex.schema.createTable('event_categories', table => {
    table.increments();
    table
      .string('category_name')
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('event_categories');
};
