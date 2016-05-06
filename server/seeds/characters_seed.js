exports.seed = function(knex, Promise){
  return Promise.join(

    knex('characters').del(),

    knex('characters').insert({

      character: '../img/rocketwiz.png', 
      level: 1
    }), 

    knex('characters').insert({

      character: '../img/bizwiz.png', 
      level: 2
    }),

    knex('characters').insert({

      character: '../img/vivi.png',
      level: 3
    })
    );
};