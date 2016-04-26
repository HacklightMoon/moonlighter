
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 

    // Inserts seed entries
    knex('users').insert({
      id: 1,
      github_username: 'Mr. Hug',
      full_name: 'Hugh Suh',
      passid: 'myPassId',
      profile_picture: 'putSomething',
      email: 'testEmail@123.com',
      token: 'uhhhhh nerp'
    }),
    knex('users').insert({
      id: 2,
      github_username: 'Mr. Fwibbles',
      full_name: 'Patrick Daly',
      passid: 'myPassId',
      profile_picture: 'putSomething',
      email: 'testEmail@456.com',
      token: 'uhhhhh nerp'
    }),
    knex('users').insert({
      id: 3,
      github_username: 'PJ',
      full_name: 'Peter "Reducey" Matteucci',
      passid: 'myPassId',
      profile_picture: 'putSomething',
      email: 'testEmail@789.com',
      token: 'uhhhhh nerp'
    })
  );
};
