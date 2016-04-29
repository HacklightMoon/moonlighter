'use strict';

let config = require('./knexfile');
let env = process.env.NODE_env || 'development';
let knex = require('knex')(config[env]);
module.exports = knex;
