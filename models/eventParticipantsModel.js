const db = require('../data/dbConfig');

async function getByEventId(id) {
  const eventSelected = await db('event_participants as e')
    .join('users as u', 'u.id', 'e.user_id')
    .select(
      'e.user_id',
      'u.email as participants_email',
      'u.fullname as participants_name',
      'u.username as participants_username',
      'u.verified',
      'e.event_id'
    )
    .where('e.event_id', id);
  return eventSelected;
}

async function addCredentials(credentials) {
  const newCredentials = await db('event_participants')
    .insert(credentials)
    .returning('*')
    .then(data => data[0]);
  return newCredentials;
}

// eslint-disable-next-line camelcase
async function remove(user_id, event_id) {
  const deleteEvent = await db('event_participants as e')
    .where('e.user_id', user_id)
    .where('e.event_id', event_id)
    .del();
  return deleteEvent;
}

const getByUserId = async (perPage, currentPage, id) => {
  const pagination = {};
  const limitPerPage = perPage || 10;
  const page = Math.max(currentPage || 1, 1);
  const offset = (page - 1) * perPage;
  return Promise.all([
    await db('event_participants as p')
      .clone()
      .count('* as count')
      .first(),
    await db('event_participants as p')
      .limit(limitPerPage)
      .offset(offset)
      .join('users as u', 'u.id', 'p.user_id')
      .join('events as e', 'e.id', 'p.event_id')
      .select(
        'p.id',
        'p.event_id',
        'p.user_id',
        'e.event_title',
        'e.event_description',
        'e.start_date',
        'e.end_date',
        'e.location',
        'e.tag_name',
        'e.rubrics',
        'e.requirements',
        'e.guidelines',
        'e.participation_type',
        'u.fullname as organizer_name',
        'u.email as organizer_email',
        'u.username as organizer_username',
        'u.verified'
      )
      .where({ user_id: id })
  ]).then(([total, rows]) => {
    const { count } = total;
    pagination.total = parseInt(count, 10);
    pagination.perPage = perPage;
    pagination.offset = offset;
    pagination.to = offset + rows.length;
    pagination.last_page = Math.ceil(count / perPage);
    pagination.currentPage = page;
    pagination.from = offset;
    pagination.data = rows;
    return pagination.data;
  });
};

module.exports = {
  getByEventId,
  addCredentials,
  remove,
  getByUserId
};
