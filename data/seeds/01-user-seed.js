/* eslint-disable func-names */
const bcrypt = require('bcrypt');

exports.seed = function (knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {
          username: "AJC",
          password: bcrypt.hash("password", 15),
          bio: "Coding Hero",
          email: "AJC.example@email.com",
          fullname: "Anthony Camp",
        },
        {
          username: "AI",
          password: bcrypt.hash("password", 15),
          bio: "French and fabulous",
          email: "AI.example@email.com",
          fullname: "Abdell Idir",
        },
        {
          username: "ELA",
          password: bcrypt.hash("password", 15),
          bio: "Grumpy ol' lady",
          email: "ELA.examle@email.com",
          fullname: "Em Andrews",
        },
        {
          username: "DE",
          password: bcrypt.hash("password", 15),
          bio: "David vs Goliath",
          email: "DE.example@com",
          fullname: "David Ekanm",
        },
        {
          username: "JA",
          password: bcrypt.hash("password", 15),
          bio: "Silent but deadly",
          email: "JA.example@com",
          fullname: "Jonny Afolabi",
        },
        {
          username: "KB",
          password: bcrypt.hash("password", 15),
          bio: "Pizza + Coffee = Life",
          email: "KB.example@email.comm",
          fullname: "Karim Bert",
        }
      ]);
    });
};