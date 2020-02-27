
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { "image_url": "https://www.thispersondoesnotexist.com/image" },
        { "image_url": "https://www.thispersondoesnotexist.com/image" },
        { "image_url": "https://www.thispersondoesnotexist.com/image" },
        { "image_url": "https://www.thispersondoesnotexist.com/image" },
        { "image_url": "https://www.thispersondoesnotexist.com/image" },
        { "image_url": "https://www.thispersondoesnotexist.com/image" }
      ]);
    });
};
