angular.module("moonlighterApp.services", [])

  // .factory('Users', function ($http) {

  //   var Users = [];
  //   // get current users
  //   var getUsers = function () {
  //     return $http({
  //       method: 'GET',
  //       url: '/user'
  //     })
  //     .then(function (resp) {
  //       return resp.data;
  //     })
  //     .catch(function (err) {
  //       console.error(err);
  //     })
  //   };

  //   return {
  //     getUsers: getUsers
  //   }

  // })

  .factory('Profile', function ($http) {

    var Profile = []
    // get user profile
    var getProfile = function () {
      return $http({
        method: 'GET',
        url: '/user/info'
      })
      .then(function (resp) {
        console.log("Got Profile: ", resp);
        // return resp.data
      })
      .catch(function (err) {
        console.error(err);
      })
    }

    var editProfile = function (profile) {
      return $http({
        method: 'POST',
        url: '/user/update',
        data: profile
      })
      .then(function (resp) {
        console.log("edited profile: ", resp);
      })
      .catch(function (err) {
        console.error(err);
      })
    }

    return {
      getProfile: getProfile,
      editProfile: editProfile
    }

  })

  .factory('Quest', function ($http) {
    var Quest = [];

    var getAllQuests = function () {
      return $http({
        method: 'GET',
        url: '/quest/feed',
      })
      .then(function(resp){
        console.log("Got quests: ", resp)
      })
      .catch(function(err){
        console.error(err)
      })
    }

    // THIS METHOD NEEDS SOME WORK. SHOULDN'T SEND DATA ON GET REQUEST..
    // var getQuest = function (quest_id) {
    //   return $http({
    //     method: 'GET',
    //     url: '/quest/quest',
    //     data: quest_id
    //   })
    //   .then(function(resp) {
    //     console.log("Quest: ", resp);
    //   })
    //   .catch(function(err){
    //     console.error(err);
    //   })
    // }

    var addQuest = function (quest) {
      return $http({
        method: 'POST',
        url: '/quest/newquest',
        data: quest
      })
      .then(function(resp) {
        console.log("New Quest: ", resp);
      })
      .catch(function(err){
        console.error(err);
      })
    }

    return {
      getAllQuests: getAllQuests,
      getQuest: getQuest,
      addQuest: addQuest
    }
  });
  