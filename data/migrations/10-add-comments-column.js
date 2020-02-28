exports.up = function(knex) {
  return knex.raw(`ALTER TABLE "project_grading"
    ADD judge_comments text`);
};

exports.down = function(knex) {
  return knex.schema.table('project_grading', table => {
    table.dropColumn('judge_comments');
  });
};
