/* eslint-disable func-names */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('events').trucate()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {
          "event_title": "",
          "event_description": "",
          "creator_id": 0,
          "creator_id": "",
          "start_date": "",
          "end_date": "",
          "location": "",
          "guidelines": "",
          "participation_type": "",
          "category_id": 0,
          "category_id": 0,
          "timestamp": true
        },
        {
          "event_title": "",
          "event_description": "",
          "creator_id": 0,
          "creator_id": "",
          "start_date": "",
          "end_date": "",
          "location": "",
          "guidelines": "",
          "participation_type": "",
          "category_id": 0,
          "category_id": 0,
          "timestamp": true
        },
        {
          "event_title": "",
          "event_description": "",
          "creator_id": 0,
          "creator_id": "",
          "start_date": "",
          "end_date": "",
          "location": "",
          "guidelines": "",
          "participation_type": "",
          "category_id": 0,
          "category_id": 0,
          "timestamp": true
        }
}      ]);
});
};
