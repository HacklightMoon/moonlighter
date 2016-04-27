
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 

    // Inserts seed entries
    knex('users').insert({
      id: 2147483645,
      github_username: 'flickerbits',
      full_name: 'Hugh Suh',
      money: 1000000,
      passid: 'myPassId',
      profile_picture: 'putSomething',
      email: 'testEmail@123.com',
      token: 'uhhhhh nerp',
      role: 'front-end',
      skills: "['JavaScript', 'React', 'LegoJS']"
    }),
    knex('users').insert({
      id: 2147483646,
      github_username: 'dalyhabit',
      full_name: 'Patrick Daly',
      money: 1000001,
      passid: 'myPassId',
      profile_picture: 'putSomething',
      email: 'testEmail@456.com',
      token: 'uhhhhh nerp',
      role: 'client-side', 
      skills: "['JavaScript', 'React', 'MATLAB', 'Backbone.js']"
    }),
    knex('users').insert({
      id: 2147483647,
      github_username: 'pmatteu2',
      full_name: 'Peter "Reducey" Matteucci',
      money: 99999,
      passid: 'myPassId',
      profile_picture: 'putSomething',
      email: 'testEmail@789.com',
      token: 'uhhhhh nerp',
      role: 'back-end',
      skills: "['Python', 'PHP', 'Drupel', 'Ruby']"
    })
  );
};
