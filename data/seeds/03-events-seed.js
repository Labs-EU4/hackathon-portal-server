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
            'The entire community of doctors and the medical staff, first-responders, research scientists, pharmacists, grocers, and scores of volunteers are restlessly doing every bit to cure infected patients, contain the spread, and provide for the ones locked down in their homes. We are calling in the global community of data scientists, entrepreneurs, social workers, designers, and engineers to join hands and serve society during this crisis. We invite developers across the globe to build prototypes that will help industries mitigate and administer the Coronavirus outbreak and its implications.',
          creator_id: 1,
          start_date: moment(new Date('2020-03-21'), 'MMM D LTS').format(),
          end_date: moment(new Date('2020-03-27'), 'MMM D LTS').format(),
          location: 'Remote',
          guidelines:
            'Develop a technological solution that will aid organizations working toward eradicating COVID-19 or assisting society with daily responsibilities (eg., medication, childcare, and grocery shopping) while ensuring isolation and loneliness. Propose technologies and innovative solutions, bioinformatics, datasets, apps for diagnosis, and the likes that can be leveraged for strengthening the fight against Coronavirus.',
          participation_type: 'team',
          category_id: 5,
          prize: 'A better tomorrow: There are no prizes for winners of this hackathon. In an attempt to do our bit, we will be contributing the prize money for the welfare of society.',
          difficulty_level: 'beginner',
          start_time: '10:30:00',
          end_time: '16:30:00',
          participant_limit: 10
        },
        {
          event_title: 'Decentraland Game Jam',
          event_description:
            'Decentraland is a decentralized virtual world powered by the Ethereum blockchain. The finite 3D virtual space is divided into parcels called LAND. Each plot of LAND is permanently owned by a member of the community, giving the owner full control over what they create and display in that location. As players explore the virtual world, the content uploaded to Decentraland is rendered on its corresponding land parcel.',
          creator_id: 3,
          start_date: moment(new Date('2020-01-16'), 'MMM D LTS').format(),
          end_date: moment(new Date('2020-03-02'), 'MMM D LTS').format(),
          location: 'Remote',
          guidelines:
            'The objective of the Decentraland Game Jam is to come up with interactive content that will become an integral part of the virtual world. There is no overall theme. Participants are free to create whatever they want, as long as it is imaginative and interactive.',
          participation_type: 'team',
          category_id: 3,
          prize: 'Win a share of 2,500,000 MANA + 200 LANDs (equivalent to approx $275,000+ USD in prizes).',
          difficulty_level: 'beginner',
          start_time: '16:30:00',
          end_time: '18:30:00',
          participant_limit: 3
        },
        {
          event_title: 'HackXLR8 Event 2019',
          event_description:
            'Hack in the heart of London Tech Week. HackXLR8 is back for a third year as part of TechXLR8 at Excel London! Returning as a 2-day hackathon, this year the theme is Enterprise Innovation. The Hack will take place from Wednesday, June 12th to Thursday, June 13th 2019! Team up to create an app, prototype, or push the boundaries of development for the next big thing in IoT, Artificial Intelligence, or Blockchain. If you have the skills or an idea to streamline an enterprise, this challenge is for you!',
          creator_id: 2,
          start_date: moment(new Date('2019-10-21'), 'MMM D LTS').format(),
          end_date: moment(new Date('2019-11-01'), 'MMM D LTS').format(),
          location: 'London, UK',
          guidelines:
            'Team up in a group of maximum 8 or minimum 2 to compete at TechXLR8 official hackathon HackXLR8! Must be on one of the following themes: Internet of Things, Artificial Intelligence, or Blockchain',
          participation_type: 'team',
          category_id: 2,
          prize: '£2.5k plus a 10 Minute Spotlight Presentation and Interview (Worth £12,500) on Startup Elevate 2020',
          difficulty_level: 'advanced',
          start_time: '12:30:00',
          end_time: '16:30:00',
          participant_limit: 30
        },
        {
          event_title: 'EatRites London',
          event_description:
            'Ordinarily, you must kiss all carbs in your eating regimen to trigger ketosis. however, these pills can assist you with getting into ketosis without denying your self utilizing a zero-carb diet plan. In any case, if that interests you, act quick. As we stated, it truly is among the major keto diet supplements accessible in the commercial center.',
          creator_id: 4,
          start_date: moment(new Date('2019-11-16'), 'MMM D LTS').format(),
          end_date: moment(new Date('2019-11-17'), 'MMM D LTS').format(),
          location: 'London, UK',
          guidelines:
            'Creative freedom! Just create something beautiful with a zero-carb diet at its heart!',
          participation_type: 'both',
          category_id: 4,
          prize: 'MacBook Air',
          difficulty_level: 'beginner',
          start_time: '12:30:00',
          end_time: '16:30:00',
          participant_limit: 20
        },
        {
          event_title: 'Top EU hackers',
          event_description:
            'Join the //Slash Hackathon 2020 and put your project ideas into reality! Find your future co-founder and spend an immersive weekend hacking in Europes Startup capital. Connect with 200 other like-minded students from all over Europe and get to know the Berlin Startup-World. //Slash is the place to celebrate your passion.',
          creator_id: 5,
          start_date: moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          end_date: moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          location: 'Paris, France',
          guidelines:
            'Join the //Slash Hackathon 2020 and put your project ideas into reality! Find your future co-founder and spend an immersive weekend hacking in Europes Startup capital. Connect with 200 other like-minded students from all over Europe and get to know the Berlin Startup-World. //Slash is the place to celebrate your passion.',
          participation_type: 'both',
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
            'Santander is on a mission to leverage the power of its APIs to develop cutting-edge digital trust solutions for its customers during this 24-hour hack! To achieve this goal, Santander is calling on developers, fintech experts, data scientists, and digital trust/identity experts to join its internal teams to collaborate and create powerful products that support privacy, protect data, and help individuals and businesses prosper.',
          creator_id: 6,
          start_date: moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          end_date: moment(new Date('2020-01-21'), 'MMM D LTS').format(),
          location: 'Rome,Italy',
          guidelines:
            'Santander is on a mission to leverage the power of its APIs to develop cutting-edge digital trust solutions for its customers during this 24-hour hack! To achieve this goal, Santander is calling on developers, fintech experts, data scientists, and digital trust/identity experts to join its internal teams to collaborate and create powerful products that support privacy, protect data, and help individuals and businesses prosper.',
          participation_type: 'both',
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