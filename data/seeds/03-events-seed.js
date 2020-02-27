/* eslint-disable func-names */
const moment = require('moment');

exports.seed = function (knex) {
  return knex('events').trucate()
    .then(function () {
      return knex('events').insert([
        {
          "event_title": "CovHack",
          "event_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "creator_id": 1,
          "start_date": moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          "end_date": moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          "location": "Coventry University, UK",
          "guidelines": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "participation_type": "team",
          "category_id": 1
        },
        {
          "event_title": "All the Hacks 2022 Hackathon",
          "event_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "creator_id": 3,
          "start_date": moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          "end_date": moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          "location": "remote",
          "guidelines": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "participation_type": "individual",
          "category_id": 3
        },
        {
          "event_title": "RTL Dathaton 2020",
          "event_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "creator_id": 2,
          "start_date": moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          "end_date": moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          "location": "Amsterdam, Netherlands",
          "guidelines": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "participation_type": "both",
          "category_id": 2
        }])
    }      
};
