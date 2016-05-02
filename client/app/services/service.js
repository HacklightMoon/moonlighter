angular.module("moonlighterApp.services", [])

  .factory('Profile', function ($http) {

    var Profile = []
    // get user profile
    var getProfile = function (user_id) {
      console.log("Sending user_id - services.js", user_id);
      return $http({
        method: 'GET',
        url: '/user/info?id=' + user_id,
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

  // .factory('Quest', function ($http) {
  //   var Quest = [];

  //   var getAllQuests = function () {
  //     return $http({
  //       method: 'GET',
  //       url: '/quest/feed',
  //     })
  //     .then(function(resp){
  //       console.log("Got quests: ", resp.data)
  //       return resp.data;
  //     })
  //     .catch(function(err){
  //       console.error(err)
  //     })
  //   }

  //   var getQuest = function() {
  //     return Quest.currentQuest;
  //   }

  //   var setQuest = function(quest){
  //     Quest.currentQuest = quest;
  //     return Quest.currentQuest;
  //   }

  //   var addQuest = function (quest) {
  //     return $http({
  //       method: 'POST',
  //       url: '/quest/newquest',
  //       data: quest
  //     })
  //     .then(function(resp) {
  //       console.log("New Quest: ", resp);
  //     })
  //     .catch(function(err){
  //       console.error(err);
  //     })
  //   }

  //   var deleteQuest = function (id) {
  //     return $http({
  //       method: 'DELETE',
  //       url: '/quest/delete?id=' + id,
  //       // data: id
  //     })
  //     .then(function(resp) {
  //       console.log("Quest delete: ", resp);
  //     })
  //     .catch(function(err){
  //       console.error(err);
  //     })
  //   }

  //   return {
  //     getAllQuests: getAllQuests,
  //     getQuest: getQuest,
  //     setQuest: setQuest,
  //     addQuest: addQuest,
  //     deleteQuest: deleteQuest
  //   }
  // })

  .factory('User', function($http) {
    var User = [];

    var getCurrentUser = function() {
      return $http({
        method: 'GET',
        url: '/user/current'
      })
      .then(function(resp) {
        return resp.data;
      })
      .catch(function(err) {
        console.error(err);
      })
    }

    var updateUserInfo = function(userData) {
      return $http({
        method: 'POST',
        url: '/user/update',
        data: userData
      })
      .then(function(resp) {
        console.log("Response from update user", resp);
      })
      .catch(function(err){
        console.error(err);
      })
    }

    return {
      getCurrentUser: getCurrentUser,
      updateUserInfo: updateUserInfo
    }
  })

  .factory('Issues', function($http) {
    var Issues = [];

    var getAllIssues = function () {
      return $http({
        method: 'GET',
        url: '/issues/load',
      })
      .then(function(resp){
        return resp.data;
      })
      .catch(function(err){
        console.error(err)
      })
    }

    var loadIssues = function () {
      return $http({
        method: 'GET',
        url: '/issues',
      })
      .then(function(resp){
        return resp.data;
      })
      .catch(function(err){
        console.error(err)
      })
    }

    var getIssue = function() {
      return Issues.currentIssue;
    }

    var setIssue = function(issue){
      Issues.currentIssue = issue;
      return Issues.currentIssue;
    }

    var addMember = function(issueID, userID) {
      return $http({
        method: 'POST',
        url: '/issues/addmember',
        data: {
          issue_id: issueID,
          user_id: userID
        }
      })
      .then(function(data) {
        console.log("data in addMember service.js: ", data);
      })
      .catch(function(err){
        console.error(err);
      })
    }

    var getMyIssues = function(userID) {
      return $http({
        method: 'GET',
        url: '/issues/myissues?id=' + userID
      })
      .then(function(resp){
        return resp.data;
      })
      .catch(function(err){
        console.error(err)
      })
    }

    return {
      getAllIssues: getAllIssues,
      loadIssues: loadIssues,
      getIssue: getIssue,
      setIssue: setIssue,
      addMember: addMember,
      getMyIssues: getMyIssues
    }
  })
  
