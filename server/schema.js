'use strict';
//If a table or column needs to be added, you may put it in schema_todo.txt
let knex = require('./db');

knex.schema.createTableIfNotExists('users', function(table){
  table.increments('id').primary();
  table.string('github_username').unique();
  table.timestamp('joined_at').defaultTo(knex.fn.now());
  table.string('full_name');
  table.integer('money').defaultTo(0);
  table.integer('passid');
  table.string('profile_picture');
  table.string('email');
  table.string('token');
  table.string('role');
  table.string('skills');
})
.createTableIfNotExists('characters', function(table){
  table.increments('id').primary();
  table.integer('user_id').references('id').inTable('users');
  table.string('name');
})
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
  table.integer('technical_skill_id').references('id').inTable('technical_skills');
  table.integer('skill_score'); //like an endorsement
})
.createTableIfNotExists('characters_skills', function(table){ //fantasy skills attached to characters
})
.createTableIfNotExists('quests', function(table){
  table.increments('id').primary();
  table.integer('user_id').references('id').inTable('users');
  table.string('user_name').references('github_username').inTable('users');
  table.timestamp('createdAt').defaultTo(knex.fn.now());
  table.string('title');
  table.string('type'); //project or issue
  table.string('stack'); //string list of technologies used
  table.string('description');
  table.integer('bounty');
  table.string('url'); // link for gh repo
  table.string('desired_feat');
})
.createTableIfNotExists('users_quests', function(table){
  table.increments('id').primary();
  table.integer('user_id').references('id').inTable('users');
  table.integer('quest_id').references('id').inTable('quests');
})
.createTableIfNotExists('requested_quests', function(table){
  table.increments('id').primary();
  table.integer('quest_id').references('id').inTable('quests');
  table.integer('user_id').references('id').inTable('users');
})
.createTableIfNotExists('technologies', function(table){
  table.increments('id').primary();
  table.string('name');
})
.createTableIfNotExists('quests_technologies', function(table){
  table.increments('id').primary();
  table.integer('quest_id').references('id').inTable('quests');
  table.integer('technology_id').references('id').inTable('technologies');
})
.createTableIfNotExists('issues', function(table){
  table.increments('id').primary();
  table.string('title');
  table.string('user');
  table.string('body');
  table.string('issue_url');
  table.string('repo_url');
})
.then(function(res){
  console.log('Success Applying Schema');
  knex.destroy();
})
.catch(function(err){
  console.log('schema.js: 48 error: ', err);
});
