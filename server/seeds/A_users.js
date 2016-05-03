
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
      passid: 2147483645,
      profile_picture: 'putSomething',
      email: 'testEmail@123.com',
      role: 'front-end',
      skills: "['JavaScript', 'React', 'LegoJS']"
    }),
    knex('users').insert({
      id: 2147483646,
      github_username: 'gitlord',
      full_name: 'Kyle Simpson',
      money: 1000001,
      passid: 2147483646,
      profile_picture: 'putSomething',
      email: 'testEmail@456.com',
      role: 'client-side', 
      skills: "['JavaScript', 'React', 'MATLAB', 'Backbone.js']"
    }),
    knex('users').insert({
      id: 2147483647,
      github_username: 'pmatteu2',
      full_name: 'Peter "Reducey" Matteucci',
      money: 99999,
      passid: 2147483647,
      profile_picture: 'putSomething',
      email: 'testEmail@789.com',
      role: 'back-end',
      skills: "['Python', 'PHP', 'Drupel', 'Ruby']"
    }),
    knex('users').insert({
      id: 1,
      github_username: 'dalyhabit',
      full_name: 'Patrick Daly',
      money: 99999,
      passid: 15750911,
      profile_picture: 'https://avatars.githubusercontent.com/u/15750911?v=3',
      email: 'dalyhabit@gmail.com',
      role: 'back-end',
      skills: "['Python', 'PHP', 'Drupel', 'Ruby']"
    })
  );
};
