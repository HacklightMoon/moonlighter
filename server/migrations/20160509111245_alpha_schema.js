
exports.up = function(knex, Promise) {

  return Promise.all([

    knex.schema.createTableIfNotExists('characters', function(table){
      table.increments('id').primary();
      table.string('class');
      table.string('image');
      table.integer('level');
    }),

    knex.schema.createTableIfNotExists('users', function(table){
      table.increments('id').primary();
      table.string('github_username').unique();
      table.string('codewars_username').unique();
      table.timestamp('joined_at').defaultTo(knex.fn.now());
      table.string('full_name');
      table.integer('money').defaultTo(1000);
      table.integer('passid');
      table.string('profile_picture');
      table.string('email');
      table.string('role');
      table.string('skills');
      table.string('deleteThis').defaultTo("yes, please");
      table.boolean('admin').defaultTo(false);
      table.boolean('troll').defaultTo(false);
      table.integer('contributions').defaultTo(0);
      table.integer('unseenContribs').defaultTo(0);
      table.integer('experience').defaultTo(0);
      table.integer('level').defaultTo(0);
      table.integer('level_id').references('id').inTable('characters');
    }),

    knex.schema.createTableIfNotExists('items', function(table){
      table.increments('id').primary();
      table.string('name');
    }),

    knex.schema.createTableIfNotExists('technical_skills', function(table){
      table.increments('id').primary();
      table.string('name');
    }),

    knex.schema.createTableIfNotExists('users_technical_skills', function(table){
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users');
      table.integer('technical_skill_id').references('id').inTable('technical_skills');
      table.integer('skill_score'); //like an endorsement
    }),

    knex.schema.createTableIfNotExists('characters_skills', function(table){ //fantasy skills attached to characters
      table.string('dexterity');
      table.string('intelligence');
      table.string('strength');
      table.string('magic');
      table.string('troll');
    }),

    knex.schema.createTableIfNotExists('issues', function(table){
      table.increments('id').primary();
      table.string('title');
      table.string('user');
      table.integer('user_id').references('id').inTable('users');
      table.integer('git_id');
      table.string('body');
      table.string('status');
      table.boolean('deleted').defaultTo(false);
      table.string('issue_url');
      table.string('repo_url');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),

    knex.schema.createTableIfNotExists('user_issues', function(table){
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users');
      table.integer('issue_id').references('id').inTable('issues');
    }),

    knex.schema.createTableIfNotExists('issue_members', function(table){
      table.increments('id').primary();
      table.integer('issue_id').references('id').inTable('issues');
      table.integer('user_id').references('id').inTable('users');
    }),

    knex.schema.createTableIfNotExists('technologies', function(table){
      table.increments('id').primary();
      table.string('name');
    })

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('characters'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('items'),
    knex.schema.dropTable('technical_skills'),
    knex.schema.dropTable('users_technical_skills'),
    knex.schema.dropTable('characters_skills'),
    knex.schema.dropTable('issues'),
    knex.schema.dropTable('user_issues'),
    knex.schema.dropTable('issue_members'),
    knex.schema.dropTable('technologies'),
  ]);
};
