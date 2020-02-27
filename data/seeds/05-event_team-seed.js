
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('event_team').del()
    .then(function () {
      // Inserts seed entries
      return knex('event_team').insert([
        { "event_id": 1, "user_id": 1, "role_type": "organizer" },
        { "event_id": 2, "user_id": 3, "role_type": "organizer" },
        { "event_id": 3, "user_id": 2, "role_type": "organizer" },
        { "event_id": 1, "user_id": 6, "role_type": "judge" },
        { "event_id": 2, "user_id": 5, "role_type": "judge" },
        { "event_id": 3, "user_id": 4, "role_type": "judge" }
      ]);
    });
};
