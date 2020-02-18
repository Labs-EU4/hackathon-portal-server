const db = require('../data/dbConfig');

async function getTeam(eventId) {
  const team = await db('event_team as team')
    .join('users as u', 'u.id', 'team.user_id')
    .join('events as e', 'e.id', 'team.event_id')
    .select(
      'team.user_id',
      'team.event_id',
      'team.role_type',
      'u.email',
      'u.verified',
      'u.fullname',
      'u.username',
      'u.image_url'
    )
    .where({ event_id: eventId });
  return team;
}

async function addTeamMember(data) {
  const member = await db('event_team')
    .insert(data)
    .returning('*')
    .then(newMember => newMember[0]);
  return member;
}

async function removeTeamMember(data) {
  const deleteEvent = await db('event_team as e')
    .where('e.user_id', data.user_id)
    .where('e.event_id', data.event_id)
    .del();
  return deleteEvent;
}

module.exports = { getTeam, addTeamMember, removeTeamMember };
