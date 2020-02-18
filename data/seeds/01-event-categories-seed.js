exports.seed = function(knex) {
  return knex('event_categories').insert([
    { category_name: 'Summer Hackaton' },
    { category_name: 'Winner Hackaton' },
    { category_name: 'Innovate Hackaton' }
  ]);
};
