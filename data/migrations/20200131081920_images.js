exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.specificType('image_url', 'text ARRAY');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('image_url');
  });
};
