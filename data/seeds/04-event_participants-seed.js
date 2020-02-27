/* eslint-disable func-names */


exports.seed = function (knex) {
  return knex('tevent_participants').truncate()
    .then(function () {
      return knex('event_participants').insert([
        { "event_id": 1, "user_id": 1 },
        { "event_id": 1, "user_id": 2 },
        { "event_id": 1, "user_id": 3 },
        { "event_id": 2, "user_id": 4 },
        { "event_id": 2, "user_id": 5 },
        { "event_id": 2, "user_id": 6 },
        { "event_id": 3, "user_id": 3 },
        { "event_id": 3, "user_id": 4 },
        { "event_id": 3, "user_id": 5 }
      ]);
    });
};
