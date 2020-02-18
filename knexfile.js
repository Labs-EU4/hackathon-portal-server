const { types } = require('pg');
const { builtins } = require('pg-types');
const moment = require('moment');
require('dotenv').config();
/**
 * Handle Date FORMAT RETURNED FROM DATABASE
 *
 * @param {*} val
 * @returns
 */
const parseFn = val => {
  return val === null ? null : moment(val).format('YYYY-MM-DD');
};

types.setTypeParser(builtins.TIMESTAMPTZ, parseFn);
types.setTypeParser(builtins.TIMESTAMP, parseFn);

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_TEST_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true
  },
  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true
  }
};
