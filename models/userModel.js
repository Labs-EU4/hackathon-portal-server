const db = require('../data/dbConfig');

async function getUserId(id) {
  const userId = await db('users')
    .where('users.id', id)
    .select('fullname', 'username', 'email', 'bio', 'image_url')
    .first();
  return userId;
}

const addUser = async user => {
  const newUser = await db('users')
    .insert(user)
    .returning('*')
    .then(data => data[0]);
  return newUser;
};

async function getUserBy(userValue) {
  const userData = await db('users')
    .where(userValue)
    .first();
  return userData;
}

async function findBy(filter) {
  const user = await db('users')
    .where(filter)
    .first();

  return user;
}

async function createOrFindUser(newUser) {
  let user = await findBy({ email: newUser.email });

  if (!user) {
    user = await addUser(newUser);
    return user;
  }
  if (process.env.OAUTH_DEFAULT_PWD === user.password) {
    return user;
  }
}

const confirmEmail = async id => {
  const user = await db('users')
    .where({ id })
    .update({ verified: true }, 'id')
    .then(ids => {
      const userId = ids[0];
      return findBy({ id: userId });
    });
  return user;
};
/**
 * User Profile Models
 *
 * @returns
 */
async function getUsers() {
  const users = await db('users as u')
    .select(
      'u.id',
      'u.email',
      'u.username',
      'u.fullname',
      'u.bio',
      'u.image_url'
    )
    .returning('*');
  return users;
}
async function getSingleUser(filter) {
  const singleUser = await db('users as u')
    .select(
      'u.id',
      'u.email',
      'u.username',
      'u.fullname',
      'u.bio',
      'u.image_url'
    )
    .where(filter)
    .first();
  return singleUser;
}
const updateUser = async (changes, id) => {
  const user = await db('users')
    .where({ id })
    .update(changes)
    .returning(['fullname', 'username', 'email', 'bio', 'image_url'])
    .then(userUpdate => userUpdate[0]);
  return user;
};

module.exports = {
  getUserId,
  addUser,
  getUserBy,
  findBy,
  createOrFindUser,
  getUsers,
  getSingleUser,
  updateUser,
  confirmEmail
};
