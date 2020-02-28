exports.up = function(knex) {
  return knex.schema.createTable('participant_teams', table => {
    table.increments();
    table
      .text('team_name')
      .unique()
      .notNullable();
    table
      .integer('event_id')
      .unsigned()
      .notNullable();
    table
      .foreign('event_id')
      .references('events.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('team_lead')
      .unsigned()
      .notNullable();
    table
      .foreign('team_lead')
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('participant_teams');
};
