exports.up = function(knex) {
  return knex.schema.createTable('project_grading', table => {
    table.increments();
    table.unique(['project_id', 'judge_id']);
    table
      .integer('project_event_id')
      .unsigned()
      .notNullable();
    table
      .foreign('project_event_id')
      .references('events.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('project_id')
      .unsigned()
      .notNullable();
    table
      .foreign('project_id')
      .references('project_entries.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table
      .integer('judge_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.integer('product_design').defaultTo(0);
    table.integer('functionality').defaultTo(0);
    table.integer('innovation').defaultTo(0);
    table.integer('product_fit').defaultTo(0);
    table.integer('extensibility').defaultTo(0);
    table.integer('presentation').defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('project_grading');
};
