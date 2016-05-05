exports.seed = function(knex, Promise){
  return Promise.join(

    knex('characters').del(),

    knex('characters').insert({

      character: '../client/img/rocketwiz.png', 
      level: 1
    }), 

    knex('characters').insert({

      character: '../client/img/bizwiz.png', 
      level: 2
    }),

    knex('characters').insert({

      character: '../client/img/vivi.png',
      level: 3
    })
    );
};