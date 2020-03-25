/* eslint-disable func-names */
const moment = require('moment');

exports.seed = function (knex) {
  return knex('events')
    .del()
    .then(function () {
      return knex('events').insert([
        {
          event_title: 'CovHack',
          event_description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          creator_id: 1,
          start_date: moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          end_date: moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          location: 'Coventry University, UK',
          guidelines:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          participation_type: 'team',
          category_id: 1,
          prize: 'DELL XPS LAPTOP',
          difficulty_level: 'beginner',
          start_time: '15:30:00',
          end_time: '16:30:00',
          participant_limit: 10
        },
        {
          event_title: 'All the Hacks 2022 Hackathon',
          event_description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          creator_id: 3,
          start_date: moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          end_date: moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          location: 'remote',
          guidelines:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          participation_type: 'individual',
          category_id: 3,
          prize: 'MacBook Pro',
          difficulty_level: 'beginner',
          start_time: '16:30:00',
          end_time: '18:30:00',
          participant_limit: 3
        },
        {
          event_title: 'RTL Dathaton 2020',
          event_description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          creator_id: 2,
          start_date: moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          end_date: moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          location: 'Amsterdam, Netherlands',
          guidelines:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          participation_type: 'both',
          category_id: 2,
          prize: 'Lenovo Thinkpad',
          difficulty_level: 'beginner',
          start_time: '12:30:00',
          end_time: '16:30:00',
          participant_limit: 8
        },
        {
          event_title: 'World tournament',
          event_description:
            'Lorem ipsum dolor sit nnamet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          creator_id: 4,
          start_date: moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          end_date: moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          location: 'Stratford, UK',
          guidelines:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          participation_type: 'both',
          category_id: 2,
          prize: '2000$',
          difficulty_level: 'beginner',
          start_time: '12:30:00',
          end_time: '16:30:00',
          participant_limit: 20
        },
        {
          event_title: 'Top EU hackers',
          event_description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna alnnniqua.',
          creator_id: 5,
          start_date: moment(new Date('2020-05-21'), 'MMM D LTS').format(),
          end_date: moment(new Date('2020-05-21'), 'MMM D LTS').format(),
          location: 'Paris, France',
          guidelines:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore maggggna aliqua.',
          participation_type: 'team',
          category_id: 2,
          prize: 'Macbook Pro',
          difficulty_level: 'beginner',
          start_time: '12:30:00',
          end_time: '16:30:00',
          participant_limit: 30
        },
        {
          event_title: 'Local PenTest',
          event_description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          creator_id: 6,
          start_date: moment(new Date('2020-06-21'), 'MMM D LTS').format(),
          end_date: moment(new Date('2020-06-21'), 'MMM D LTS').format(),
          location: 'Rome,Italy',
          guidelines:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          participation_type: 'individual',
          category_id: 3,
          prize: '20kg of coffee',
          difficulty_level: 'beginner',
          start_time: '12:30:00',
          end_time: '16:30:00',
          participant_limit: 9
        }
      ]);
    });
};
