/* eslint-disable func-names */
exports.up = function(knex) {
  return knex.raw(`ALTER TABLE "events"
  ADD rubrics text[] default '{}', ADD requirements text[] default '{}'`);
};

exports.down = function(knex) {
  return knex.schema.table('events', table => {
    table.dropColumn('rubrics');
    table.dropColumn('requirements');
  });
};
