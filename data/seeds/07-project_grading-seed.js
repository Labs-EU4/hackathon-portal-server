
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('project_grading').del()
    .then(function () {
      // Inserts seed entries
      return knex('project_grading').insert([
        {
          "project_event_id": 1,
          "project_id": 1,
          "judge_id": 6
        },
        {
          "project_event_id": 2,
          "project_id": 2,
          "judge_id": 5
        },
        {
          "project_event_id": 3,
          "project_id": 3,
          "judge_id": 4
        },
        {
          "project_event_id": 2,
          "project_id": 4,
          "judge_id": 5
        },
        {
          "project_event_id": 2,
          "project_id": 5,
          "judge_id": 5
        },
        {
          "project_event_id": 1,
          "project_id": 6,
          "judge_id": 6
        }
      ]);
    });
};
