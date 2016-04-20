'use strict';

let knex = require('db');

knex.schema.createTableIfNotExists('users', function(table){
  table.increments('id').primary();
  table.integer('character_id').references('id').inTable('characters');
  table.string('gitub_username');
  //currencies
  //...
  //...
  //achievements
  //...
  //...
}).schema.createTableIfNotExists('characters', function(table){
  table.increments('id').primary();
  table.integer('user_id').references('id').inTable('users');
  table.string('name');
  //stats
  //class
  //...
  //assets
  //...
  //...
}).schema.createTableIfNotExists('technicalSkills', function(table){
  table.increments('id').primary();
  table.string('name');
}).schema.createTableIfNotExists('usersTechnicalSkills', function(table){
  table.increments('id').primary();
  table.integer('user_id').references('id').inTable('users');
  table.integer('technical_skill_id').references('id').inTable('technicalSkills');
  table.integer('skill_score'); //like an endorsement
}.knex.schema.createTableIfNotExists('charactersSkills', function(table){ //fantasy skills atched to characters
}).then(function(res){
  console.log('Success Applying Schema');
}).catch(function(err){
  console.log('Blah Blah Blah ERROR');
});
