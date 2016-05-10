'use strict';

let config = require('./knexfile');
let env = process.env.NODE_ENV || 'development';
let knex = require('knex')(config[env]);
module.exports = knex;

//knex.migrate.latest();
