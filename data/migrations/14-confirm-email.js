exports.up = function(knex) {
  return knex.raw(`ALTER TABLE "users"
        ADD verified boolean DEFAULT false`);
};

exports.down = function(knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('verified');
  });
};
