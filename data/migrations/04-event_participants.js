exports.up = function(knex) {
  return knex.schema.createTable('event_participants', table => {
    table.increments();
    table.unique(['event_id', 'user_id']);
    table
      .integer('event_id')
      .references('id')
      .inTable('events')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('event_participants');
};
