module.exports = {
  validInput1: {
    email: 'banner@yahoo.com',
    password: 'bruce banner'
  },
  validInput2: {
    email: 'mk@yahoo.com',
    password: 'ulor mike'
  },
  validInput3: {
    email: 'frod@yahoo.com',
    password: 'shire prince'
  },
  profile: {
    email: 'pc@hackton.com',
    username: 'fun',
    fullname: 'Pascal Ulor',
    bio: "I'm the worlds greatest"
  },
  existingUsername: {
    email: 'dave@yahoo.com',
    password: 'dave 1234'
  },

  existingEmail: {
    email: 'banner@yahoo.com',
    password: 'theFlash'
  },
  incompleteData: {
    email: 'annie@yahoo.com'
  },
  emptyData: {
    email: '',
    password: ''
  },
  improperData: {
    email: 'banner',
    password: 'bruce'
  },
  unregisteredEmail: {
    email: 'notreg@getMaxListeners.com'
  },
  registeredEmail: {
    email: 'banner@yahoo.com'
  },
  newPassword: {
    password: 'abcdefghij'
  },
  userOneLogin: { email: 'banner@yahoo.com', password: 'bruce banner' },
  userTwoLogin: { email: 'mk@yahoo.com', password: 'ulor mike' },
  emptyLoginData: { email: '', password: '' },
  noEmail: { email: '', password: 'bruce banner' },
  noPassword: { email: 'mk@yahoo.com', password: '' },
  invalidEmail: { email: 'wrongEmail', password: 'bruce banner' },
  invalidPassword: { email: 'Bruce Banner', password: 'wrongPassword' },
  invalidEmailPassword: { email: 'wrongEmail', password: 'wrongPassword' }
};
