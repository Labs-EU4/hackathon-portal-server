exports.up = function(knex) {
  return knex.raw(`ALTER TABLE "events"
  ADD tag_name text[] default '{}'`);
};

exports.down = function(knex) {
  return knex.schema.table('events', table => {
    table.dropColumn('tag_name');
  });
};
