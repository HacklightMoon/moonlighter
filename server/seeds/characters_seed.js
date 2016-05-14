exports.seed = function(knex, Promise){
  return Promise.join(
    knex('characters').del(),

    knex('characters').insert({
      character: '../art/knight-1.png', 
      level: 1,
      character_name: 'Not the Chosen One'
    }), 

    knex('characters').insert({
      character: '../art/dwarf-1.png', 
      level: 2,
      character_name: 'Gingerbeard Man'
    }),

    knex('characters').insert({
      character: '../art/assassin-1.png',
      level: 3,
      character_name: 'The Little Murdermaid',
    }),

    knex('characters').insert({
      character: '../art/archer-1.png', 
      level: 4,
      character_name: 'Sprock'
    }), 

    knex('characters').insert({
      character: '../art/wizard-1.png', 
      level: 5,
      character_name: 'Major in Owlology'
    }),

    knex('characters').insert({
      character: '../art/knight-2.png',
      level: 6,
      character_name: 'Maybe the Chosen One',
    }),

    knex('characters').insert({
      character: '../art/dwarf-2.png', 
      level: 7,
      character_name: 'Tight Dwarf'
    }), 

    knex('characters').insert({
      character: '../art/assassin-2.png', 
      level: 8,
      character_name: 'Shiv White and the Seven Gores'
    }),

    knex('characters').insert({
      character: '../art/archer-2.png',
      level: 9,
      character_name: 'Legalos',
    }),

    knex('characters').insert({
      character: '../art/wizard-2.png', 
      level: 10,
      character_name: 'Guy Holding an Owl'
    }), 

    knex('characters').insert({
      character: '../art/knight-3.png', 
      level: 11,
      character_name: 'Kabob the Chosen One'
    }),

    knex('characters').insert({
      character: '../art/dwarf-3.png',
      level: 12,
      character_name: 'Short Odin',
    }),

    knex('characters').insert({
      character: '../art/assassin-3.png', 
      level: 13,
      character_name: 'Ninjarella'
    }), 

    knex('characters').insert({
      character: '../art/archer-3.png', 
      level: 14,
      character_name: 'The Rond'
    }),

    knex('characters').insert({
      character: '../art/wizard-3.png',
      level: 15,
      character_name: 'Gilbert the Moonlighter',
    })
  );
};
