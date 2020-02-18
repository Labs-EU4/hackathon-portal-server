exports.up = function(knex) {
  return knex.schema.createTable('participant_team_members', table => {
    table.increments();
    table
      .integer('team_member')
      .unsigned()
      .notNullable();
    table
      .foreign('team_member')
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('team_id')
      .unsigned()
      .notNullable();
    table
      .foreign('team_id')
      .references('participant_teams.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('participant_team_members');
};
