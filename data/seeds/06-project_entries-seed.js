
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('project_entries').del()
    .then(function () {
      // Inserts seed entries
      return knex('project_entries').insert([
        {
          "project_title": "Diva Code",
          "participant_or_team_name": "Diva Code Team",
          "event_id": 1,
          "video_url": "here.com",
          "git_url": "overThere.com",
          "project_writeups": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
          "submitted_by": 4
        },
        {
          "project_title": "Trojan Hash Defiance",
          "participant_or_team_name": "Trojan Hash Defiance Team",
          "event_id": 2,
          "video_url": "here.com",
          "git_url": "overThere.com",
          "project_writeups": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
          "submitted_by": 3
        },
        {
          "project_title": "The Bug Stops Here",
          "participant_or_team_name": "The Bug Stops Here Team",
          "event_id": 3,
          "video_url": "here.com",
          "git_url": "overThere.com",
          "project_writeups": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
          "submitted_by": 4
        },
        {
          "project_title": "Creep Access",
          "participant_or_team_name": "Creep Access Team",
          "event_id": 2,
          "video_url": "here.com",
          "git_url": "overThere.com",
          "project_writeups": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
          "submitted_by": 5
        },
        {
          "project_title": "The Bug Slayers",
          "participant_or_team_name": "The Bug Slayers Team",
          "event_id": 2,
          "video_url": "here.com",
          "git_url": "overThere.com",
          "project_writeups": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
          "submitted_by": 6
        },
        {
          "project_title": "Bit Rebels",
          "participant_or_team_name": "Bit Rebels Team",
          "event_id": 1,
          "video_url": "here.com",
          "git_url": "overThere.com",
          "project_writeups": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
          "submitted_by": 1
        }
      ]);
    });
};
