'use strict';
//If a table or column needs to be added, you may put it in schema_todo.txt
let knex = require('./db');

knex.schema.createTableIfNotExists('characters', function(table){
  table.increments('id').primary();
  table.string('character');
  table.integer('level');
  table.string('character_name');
})
.createTableIfNotExists('users', function(table){
  table.increments('id').primary();
  table.string('github_username').unique();
  table.string('codewars_username').unique();
  table.string('codewars_API_key').unique();
  table.timestamp('joined_at').defaultTo(knex.fn.now());
  table.string('full_name');
  table.integer('money').defaultTo(1000);
  table.integer('passid');
  table.string('profile_picture');
  table.string('email');
  table.string('role');
  table.string('skills');
  table.boolean('admin').defaultTo(false);
  table.integer('contributions').defaultTo(0);
  table.integer('unseenContribs').defaultTo(0);
  table.integer('honor').defaultTo(0);
  table.integer('experience').defaultTo(0);
  table.integer('level').defaultTo(0);
  table.integer('level_id').references('id').inTable('characters');
})
// .createTableIfNotExists('user_character', function(table){
//   table.increments('id').primary();
//   table.integer('user_id').references('id').inTable('users');
//   table.integer('char_id').references('id').inTable('characters');
//   table.string('name');
//   table.integer('level');
// })
.createTableIfNotExists('items', function(table){
  table.increments('id').primary();
  table.string('name');
})
.createTableIfNotExists('technical_skills', function(table){
  table.increments('id').primary();
  table.string('name');
})
.createTableIfNotExists('users_technical_skills', function(table){
  table.increments('id').primary();
  table.integer('user_id').references('id').inTable('users');
  table.integer('tech_skill_id').references('id').inTable('technical_skills');
  table.integer('skill_score'); //like an endorsement
})
//fantasy skills attached to characters
.createTableIfNotExists('characters_skills', function(table){
  table.string('dexterity');
  table.string('intelligence');
  table.string('strength');
  table.string('magic');
  table.string('troll');
})
.createTableIfNotExists('issues', function(table){
  table.increments('id').primary();
  table.string('title');
  table.string('user');
  table.integer('user_id').references('id').inTable('users');
  table.integer('git_id').unique();
  table.string('body');
  table.string('status');
  table.boolean('deleted').defaultTo(false);
  table.string('issue_url');
  table.string('repo_url');
  table.timestamp('created_at').defaultTo(knex.fn.now());
})
.createTableIfNotExists('user_issues', function(table){
  table.increments('id').primary();
  table.integer('user_id').references('id').inTable('users');
  table.integer('issue_id').references('id').inTable('issues');
})
.createTableIfNotExists('issue_members', function(table){
  table.increments('id').primary();
  table.integer('issue_id').references('id').inTable('issues');
  table.integer('user_id').references('id').inTable('users');
  // table.string('status');
})
.createTableIfNotExists('technologies', function(table){
  table.increments('id').primary();
  table.string('name');
})
.then(function(res){
  console.log('Success Applying Schema');
  knex.destroy();
})
.catch(function(err){
  console.log('schema.js: 74 error: ', err);
});
