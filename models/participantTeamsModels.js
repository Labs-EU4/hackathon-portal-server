const db = require('../data/dbConfig');

// project grading models
async function createTeam(team) {
  const createdTeam = await db('participant_teams')
    .insert(team)
    .returning('*');
  return createdTeam;
}
async function updateTeam(id, team) {
  const updatedTeam = await db('participant_teams')
    .where({ id })
    .update(team)
    .returning('*');
  return updatedTeam;
}

async function findTeam(id) {
  const foundTeam = await db('participant_teams as p')
    .join('users as u', 'u.id', 'p.team_lead')
    .select(
      'p.team_name',
      'p.team_lead',
      'u.username as team_lead_username',
      'u.fullname as team_lead_fullname',
      'p.event_id',
      'p.id'
    )
    .where('p.id', id);
  return foundTeam;
}

async function findTeamByEventId(id) {
  const foundEventTeams = await db('participant_teams as p').where(
    'p.event_id',
    id
  );
  return foundEventTeams;
}

async function RemoveTeam(id) {
  const removedTeam = await db('participant_teams as p')
    .where({ id })
    .delete();
  return removedTeam;
}

// Participant team members models

async function addTeamMate(teamMate) {
  const createdTeamMember = await db('participant_team_members')
    .insert(teamMate)
    .returning('*');
  return createdTeamMember;
}

async function findTeamMate(id) {
  const foundTeamMember = await db('participant_team_members as p')
    .join('users as u', 'u.id', 'p.team_member')
    .select(
      'u.email as team_member_email',
      'u.fullname as team_member_fullname',
      'u.image_url as team_member_avatar',
      'p.id',
      'p.team_id',
      'p.team_member'
    )
    .where('p.team_id', id);

  return foundTeamMember;
}
async function removeTeamMate(id) {
  const removeTeamMember = await db('participant_team_members')
    .where({
      team_member: id
    })
    .delete();
  return removeTeamMember;
}

module.exports = {
  // Participant Teams models
  createTeam,
  updateTeam,
  RemoveTeam,
  findTeam,
  findTeamByEventId,
  // Participant Team Members models
  addTeamMate,
  findTeamMate,
  removeTeamMate
};
