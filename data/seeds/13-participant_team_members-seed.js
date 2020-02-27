
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('participant_team_members').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('participant_team_members').insert([
        {
          "team_member": 3,
          "team_id": 1
        },
        {
          "team_member": 4,
          "team_id": 2
        },
        {
          "team_member": 5,
          "team_id": 3
        },
        {
          "team_member": 6,
          "team_id": 4
        },
        {
          "team_member": 1,
          "team_id": 5
        },
        {
          "team_member": 2,
          "team_id": 6
        },
        {
          "team_member": 3,
          "team_id": 1
        },
        {
          "team_member": 4,
          "team_id": 2
        },
        {
          "team_member": 5,
          "team_id": 3
        }
      ]);
    });
};
