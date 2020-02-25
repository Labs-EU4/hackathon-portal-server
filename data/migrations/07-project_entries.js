/* eslint-disable func-names */
exports.up = function(knex) {
  return knex.schema.createTable('project_entries', table => {
    table.increments();
    table
      .text('project_title')
      .notNullable()
      .unique();
    table.text('participant_or_team_name').notNullable();
    table
      .integer('event_id')
      .unsigned()
      .notNullable();

    table
      .foreign('event_id')
      .references('events.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('video_url');
    table.string('git_url');
    table.text('project_writeups');
    table
      .integer('submitted_by')
      .unsigned()
      .notNullable();
    table
      .foreign('submitted_by')
      .references('users.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('project_entries');
};
