/* eslint-disable func-names */
const bcrypt = require('bcrypt');
exports.seed = function (knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          username: "AJC",
          password: bcrypt.hashSync('Password1234', 15),
          bio: "Coding Hero",
          email: "AJC.example@email.com",
          fullname: "Anthony Camp",
        },
        {
          username: "AI",
          password: bcrypt.hashSync('Password1234', 15),
          bio: "French and fabulous",
          email: "AI.example@email.com",
          fullname: "Abdell Idir",
        },
        {
          username: "ELA",
          password: bcrypt.hashSync('Password1234', 15),
          bio: "Grumpy ol' lady",
          email: "ELA.example@email.com",
          fullname: "Em Andrews",
        },
        {
          username: "DE",
          password: bcrypt.hashSync('Password1234', 15),
          bio: "David vs Goliath",
          email: "DE.example@google.com",
          fullname: "David Ekanm",
        },
        {
          username: "JA",
          password: bcrypt.hashSync('Password1234', 15),
          bio: "Silent but deadly",
          email: "JA.example@mail.com",
          fullname: "Jonny Afolabi",
        },
        {
          username: "KB",
          password: bcrypt.hashSync('Password1234', 15),
          bio: "Pizza + Coffee = Life",
          email: "KB.example@email.com",
          fullname: "Karim Bert",
        },
        {
          username: "Matty",
          password: bcrypt.hashSync('Password1234', 15),
          bio: "New and excited",
          email: "Matty.email@email.com",
          fullname: "Matty Matterson",
        },
        {
          username: "SonniBoi",
          password: bcrypt.hashSync('Password1234', 15),
          bio: "Sun God and proud!",
          email: "Sonny.email@email.com",
          fullname: "Sonny Andrews",
        },
        {
          username: "AJ",
          password: bcrypt.hashSync('Password1234', 15),
          bio: " ",
          email: "AJ.email@email.com",
          fullname: "Andrew Jackson",
        },
        {
          username: "Wallace",
          password: bcrypt.hashSync('Password1234', 15),
          bio: "Investor by day, coder by night",
          email: "wally@google.com",
          fullname: "Wallace Wallace",
        },
        {
          username: "'Bob'",
          password: bcrypt.hashSync('Password1234', 15),
          bio: "Silent but deadly",
          email: "BobLee@mail.com",
          fullname: "Simon Lee",
        },
      ]);
    });
};