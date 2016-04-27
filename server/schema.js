'use strict';
//If a table or column needs to be added, you may put it in schema_todo.txt
let knex = require('./db');

knex.schema.createTableIfNotExists('users', function(table){
  table.increments('id').primary();
  table.string('github_username').unique();
  table.timestamp('joined_at').defaultTo(knex.fn.now());
  table.string('full_name');
  table.integer('money').defaultTo(0);
  table.string('passid');
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
.createTableIfNotExists('quests', function(table){
  table.increments('id').primary();
  table.integer('user_id').references('id').inTable('users');
  table.string('user_name').references('github_username').inTable('users');
  table.timestamp('createdAt').defaultTo(knex.fn.now());
  table.string('title');
  table.string('type');//project or issue
  table.string('stack');//string list of technologies used
  table.string('description');
  table.integer('bounty');
  table.string('url'); // link for gh repo
})
.createTableIfNotExists('usersQuests', function(table){
  table.increments('id').primary();
  table.integer('user_id').references('id').inTable('users');
  table.integer('quest_id').references('id').inTable('quests');
})
.createTableIfNotExists('technologies', function(table){
  table.increments('id').primary();
  table.string('name');
})
.createTableIfNotExists('questsTechnologies', function(table){
  table.increments('id').primary();
  table.integer('quest_id').references('id').inTable('quests');
  table.integer('technology_id').references('id').inTable('technologies');
})
.then(function(res){
  console.log('Success Applying Schema');
  knex.destroy();
})
.catch(function(err){
  console.log('schema.js: 48 error: ', err);
});
