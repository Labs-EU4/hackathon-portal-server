const knex = require('knex');
const environment = require('../environment');

const config = require('../knexfile');

module.exports = knex(config[environment]);
