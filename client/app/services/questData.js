moonlighterApp.factory('questData', function(){
  var questData = [{
    "id": 7, 
    "type": "project",
    "description": "Web-App",
    "name": "BadBoy Fantasy",
    "tech": ["AngularJS", "Postgres", "Node.js", "Express.js"],
    "url": "https://github.com/richardjboothe",
    "developers": 4,
    "roles": ['Designer', 'Front-end', 'Front-end', 'Back-end'],
    "pay": "equity"
  },
  {
    "id": 8, 
    "type": "project",
    "description": "Mobile App and Web-App",
    "name": "HollR",
    "tech": ["Ruby", "Postgres", "Ruby on Rails"],
    "url": "https://github.com/richardjboothe",
    "developers": 4,
    "roles": ['Designer', 'Front-end', 'Front-end', 'Back-end'],
    "pay": "equity"
  }];
  return {
    list: function(){
      return questData;
    },
    //NEED CUSTOM FUNCTION FOR FINDING OR IMPORT UNDERSCORE.
    // find: function(id){
    //   return _.find(shows, function(show){return show.id==id});
    // }
  }


});