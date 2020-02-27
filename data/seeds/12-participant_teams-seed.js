
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('participant_teams').trucate()
    .then(function () {
      // Inserts seed entries
      return knex('participant_teams').insert([
        {
          "team_name": "Diva Code Team",
          "event_id": 1,
          "team_lead": 2
        },
        {
          "team_name": "Trojan Hash Defiance Team",
          "event_id": 2,
          "team_lead": 3
        },
        {
          "team_name": "The Bug Stops Here Team",
          "event_id": 3,
          "team_lead": 4
        },
        {
          "team_name": "Creep Access Team",
          "event_id": 2,
          "team_lead": 5
        },
        {
          "team_name": "The Bug Slayers Team",
          "event_id": 2,
          "team_lead": 6
        },
        {
          "team_name": "Bit Rebels",
          "event_id": 1,
          "team_lead": 1
        }
      ]);
    });
};
