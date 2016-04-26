exports.seed = function(knex, Promise){
  return Promise.join(

    knex('quests').del(),
    
    knex('quests').insert({

    user_id: 1,
    user_name: 'flickerbits',
    title: "Yelo",
    type: "project",
    stack: ['node.js', 'express.js','backbone.js', 'mongoDB' ],
    description: "Ever wanted to find people who love the color yellow just as much as you?",
    bounty: 120
  }),

    knex('quests').insert({

    user_id: 2,
    user_name: 'dalyhabit',
    title: "KillerRx",
    type: "project",
    stack: ['ruby','postgres','ruby on rails','cowboy'],
    description: "Finding that good, just got even easier",
    bounty: 160
  }),

    knex('quests').insert({

    user_id: 3,
    user_name: 'pmatteu2',
    title: "PiratesMeet",
    type: "project",
    stack: ['react.js','ember.js', 'handlebars.js'],
    description: "A place where pirates can find some booty",
    bounty: 300
  }),

    knex('quests').insert({

    user_id: 3,
    user_name: 'pmatteu2',
    title: "Yankly",
    type: "project",
    stack: ['react.js','ember.js', 'handlebars.js'],
    description: "A marketplace app for synergy-driven, disruptive iconoclast",
    bounty: 500
  }),

    knex('quests').insert({
    user_id: 3,
    user_name: 'pmatteu2',
    title: "Butterz",
    type: "project",
    stack: ['react.js','ember.js', 'handlebars.js'],
    description: "Where you can find your artisan butter",
    bounty: 300
  })
  );
};
