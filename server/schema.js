'use strict';

let knex = require('./db');

knex.schema.createTableIfNotExists('users', function(table){
  table.increments('id').primary();
  table.string('github_username');
  table.string('full_name');
  table.string('passid');
  table.string('profile_picture');
  table.string('email');
  table.string('token');
})
.createTableIfNotExists('characters', function(table){
  table.increments('id').primary();
  table.integer('user_id').references('id').inTable('users');
  table.string('name');
})
.createTableIfNotExists('technicalSkills', function(table){
  table.increments('id').primary();
  table.string('name');
})
.createTableIfNotExists('usersTechnicalSkills', function(table){
  table.increments('id').primary();
  table.integer('user_id').references('id').inTable('users');
  table.integer('technical_skill_id').references('id').inTable('technicalSkills');
  table.integer('skill_score'); //like an endorsement
})
.createTableIfNotExists('charactersSkills', function(table){ //fantasy skills attached to characters
})
.then(function(res){
  console.log('Success Applying Schema');
  knex.destroy();
})
.catch(function(err){
  console.log('schema.js: 48 error: ', err);
});
