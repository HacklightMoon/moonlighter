
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 

    // Inserts seed entries
    knex('users').insert({
      id: 1,
      github_username: 'flickerbits',
      full_name: 'Hugh Suh',
      passid: 'myPassId',
      profile_picture: 'putSomething',
      email: 'testEmail@123.com',
      token: 'uhhhhh nerp'
    }),
    knex('users').insert({
      id: 2,
      github_username: 'dalyhabit',
      full_name: 'Patrick Daly',
      passid: 'myPassId',
      profile_picture: 'putSomething',
      email: 'testEmail@456.com',
      token: 'uhhhhh nerp'
    }),
    knex('users').insert({
      id: 3,
      github_username: 'pmatteu2',
      full_name: 'Peter "Reducey" Matteucci',
      passid: 'myPassId',
      profile_picture: 'putSomething',
      email: 'testEmail@789.com',
      token: 'uhhhhh nerp'
    })
  );
};
