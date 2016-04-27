angular.module("moonlighterApp.services", [])

  .factory('Profile', function ($http) {

    var Profile = []
    // get user profile
    var getProfile = function (user_id) {
      console.log("Sending user_id - services.js", user_id);
      return $http({
        method: 'GET',
        url: '/user/info',
        data: user_id
      })
      .then(function (resp) {
        console.log("Got Profile: ", resp);
        return resp;
      })
      .catch(function (err) {
        console.error(err);
      });
    };

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

    var setUser = function (user_id) {
      Profile.questOwner = user_id;
      return Profile.questOwner;
    }

    var getUser = function () {
      return Profile.questOwner;
    }

    return {
      getProfile: getProfile,
      editProfile: editProfile,
      getUser: getUser,
      setUser: setUser
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
        console.log("Got quests: ", resp.data)
        return resp.data;
      })
      .catch(function(err){
        console.error(err)
      })
    }

    var getQuest = function() {
      return Quest.currentQuest;
    }

    var setQuest = function(quest){
      Quest.currentQuest = quest;
      return Quest.currentQuest;
    }

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
      setQuest: setQuest,
      addQuest: addQuest
    }
  });
  