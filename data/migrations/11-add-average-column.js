exports.up = function (knex) {
  return knex.raw(`ALTER TABLE "project_grading"
      ADD average_rating float(1)`);
};

exports.down = function (knex) {
  return knex.schema.table('project_grading', table => {
    table.dropColumn('average_rating');
  });
};
