
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
          "video_url": "DivaDiva.com",
          "git_url": "DivaRepo.com",
          "project_writeups": "The maker of this theme has designed a very compact structure that can hold the maximum amount of relevant details of a project. The user can be highly benefitted with the employment of the current template.",
          "submitted_by": 4
        },
        {
          "project_title": "Trojan Hash Defiance",
          "participant_or_team_name": "Trojan Hash Defiance Team",
          "event_id": 2,
          "video_url": "TrojanHasher.com",
          "git_url": "TrojanRepo.com",
          "project_writeups": "The design is highly formal in its looks. The user can employ it for academic or even professional use. The theme has been given a generic format that can be used by a large array of people.",
          "submitted_by": 3
        },
        {
          "project_title": "The Bug Stops Here",
          "participant_or_team_name": "The Bug Stops Here Team",
          "event_id": 3,
          "video_url": "PetGrandma.com",
          "git_url": "PetGrandmaRepo.com",
          "project_writeups": "Pet Grandma Inc. offers superior on-site pet sitting and exercising services for dogs and cats, providing the personal loving pet care that the owners themselves would provide if they were home. Our team will ensure that pet owners can take business trips or vacations knowing that their pets are in good hands.",
          "submitted_by": 4
        },
        {
          "project_title": "Creep Access",
          "participant_or_team_name": "Creep Access Team",
          "event_id": 2,
          "video_url": "SystemsAccess.com",
          "git_url": "SystemsAccessRepo.com",
          "project_writeups": "This project involves building a system that modulates light in the 0.1Hz to 50kHz range and detects the reflected light through the patient’s tissue at multiple distances.",
          "submitted_by": 5
        },
        {
          "project_title": "The Bug Slayers",
          "participant_or_team_name": "The Bug Slayers Team",
          "event_id": 2,
          "video_url": "BugResearcher.com",
          "git_url": "BugResearcherRepo.com",
          "project_writeups": "A description of the proposed research project, including preliminary supporting data where appropriate, specific objectives, methods, and procedures to be used, and expected significance of the results",
          "submitted_by": 6
        },
        {
          "project_title": "Bit Rebels",
          "participant_or_team_name": "Bit Rebels Team",
          "event_id": 1,
          "video_url": "Programmer.com",
          "git_url": "ProgrammerRepo.com",
          "project_writeups": "Learning to program forces us to think clearly and rigorously when solving a problem, because the solution has to be described in very small and precise steps that even a machine can understand. ",
          "submitted_by": 1
        }
      ]);
    });
};
