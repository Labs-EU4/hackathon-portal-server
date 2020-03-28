exports.seed = function (knex) {
  return knex('event_categories')
    .del()
    .then(function () {
      return knex('event_categories').insert([
        { category_name: 'Summer Hackaton' },
        { category_name: 'Winner Hackaton' },
        { category_name: 'Remote' },
        { category_name: '24hr Sprint' },
        { category_name: 'Innovate Hackaton' }
      ]);
    });
};