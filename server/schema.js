'use strict';

let knex = require('./db');

knex.schema.createTableIfNotExists('users', function(table){
  table.increments('id').primary();
  // table.integer('character_id').references('id').inTable('characters');
  table.string('github_username');
  //currencies
  //...
  //...
  //achievements
  //...
  //...
})
.createTableIfNotExists('characters', function(table){
  table.increments('id').primary();
  table.integer('user_id').references('id').inTable('users');
  table.string('name');
    //stats
    //class
    //...
    //assets
    //...
    //...
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
.createTableIfNotExists('charactersSkills', function(table){ //fantasy skills atched to characters
})
.then(function(res){
  console.log('Success Applying Schema');
  knex.destroy();
})
.catch(function(err){
  console.log('Blah Blah Blah ERROR', err);
});
