/* eslint-disable func-names */
exports.up = function(knex) {
  return knex.schema.createTable('events', table => {
    table.increments();
    table
      .text('event_title')
      .notNullable()
      .unique();
    table.text('event_description').notNullable();
    table
      .integer('creator_id')
      .unsigned()
      .notNullable();

    table
      .foreign('creator_id')
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.datetime('start_date').notNullable();
    table.datetime('end_date').notNullable();
    table.text('location').notNullable();
    table.text('guidelines').notNullable();
    table
      .enu('participation_type', ['individual', 'team', 'both'])
      .notNullable();
    table
      .integer('category_id')
      .unsigned()
      .notNullable();
    table
      .foreign('category_id')
      .references('event_categories.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('events');
};
