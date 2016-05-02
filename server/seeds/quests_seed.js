exports.seed = function(knex, Promise){
  return Promise.join(

    knex('issues').del(),
    
    knex('issues').insert({

    user_id: 2147483645,
    user: 'flickerbits',
    title: "Yelo",
    body: "Ever wanted to find people who love the color yellow just as much as you?",
    deleted: false,
    issue_url: "http://google.com",
    repo_url: "http://google.com"
  }),

    knex('issues').insert({

    user_id: 2147483646,
    user: 'gitlord',
    title: "KillerRx",
    body: "Finding that good, just got even easier",
    deleted: false,
    issue_url: "http://google.com",
    repo_url: "http://google.com"
  }),

    knex('issues').insert({

    user_id: 2147483647,
    user: 'pmatteu2',
    title: "PiratesMeet",
    body: "A place where pirates can find some booty",
    deleted: false,
    issue_url: "http://google.com",
    repo_url: "http://google.com"
  }),

    knex('issues').insert({

    user_id: 2147483647,
    user: 'pmatteu2',
    title: "Yankly",
    body: "A marketplace app for synergy-driven, disruptive iconoclast",
    deleted: false,
    issue_url: "http://google.com",
    repo_url: "http://google.com"
  }),

    knex('issues').insert({
    user_id: 2147483647,
    user: 'pmatteu2',
    title: "Butterz",
    body: "Where you can find your artisan butter",
    deleted: false,
    issue_url: "http://google.com",
    repo_url: "http://google.com"
  })
  );
};
