exports.seed = function(knex, Promise){
  return Promise.join(

    knex('characters').del(),

    knex('characters').insert({

      character: '../art/knight-1.png', 
      level: 1,
      character_name: 'Crappy Knight'
    }), 

    knex('characters').insert({

      character: '../art/dwarf-1.png', 
      level: 2,
      character_name: 'Crappy Dwarf'
    }),

    knex('characters').insert({

      character: '../art/assassin-1.png',
      level: 3,
      character_name: 'Crappy Assassin',
    }),

    knex('characters').insert({

      character: '../art/archer-1.png', 
      level: 4,
      character_name: 'Crappy Elf'
    }), 

    knex('characters').insert({

      character: '../art/wizard-1.png', 
      level: 5,
      character_name: 'Crappy Wizard'
    }),

    knex('characters').insert({

      character: '../art/knight-2.png',
      level: 6,
      character_name: 'Cool Knight',
    }),

      knex('characters').insert({

      character: '../art/dwarf-2.png', 
      level: 7,
      character_name: 'Cool Dwarf'
    }), 

    knex('characters').insert({

      character: '../art/assassin-2.png', 
      level: 8,
      character_name: 'Cool Assassin'
    }),

    knex('characters').insert({

      character: '../art/elf-2.png',
      level: 9,
      character_name: 'Cool Elf',
    }),

    knex('characters').insert({

      character: '../art/wizard-2.png', 
      level: 10,
      character_name: 'Cool Wizard'
    }), 

    knex('characters').insert({

      character: '../art/knight-3.png', 
      level: 11,
      character_name: 'B.A. Knight'
    }),

    knex('characters').insert({

      character: '../art/dwarf-3.png',
      level: 12,
      character_name: 'B.A. Dwarf',
    }),

      knex('characters').insert({

      character: '../art/assassin-3.png', 
      level: 13,
      character_name: 'B.A. Assassin'
    }), 

    knex('characters').insert({

      character: '../art/elf-3.png', 
      level: 14,
      character_name: 'B.A. Elf'
    }),

    knex('characters').insert({

      character: '../art/wizard-3.png',
      level: 15,
      character_name: 'Moonlighter',
    })

    );
};