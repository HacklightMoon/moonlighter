 angular.module("moonlighterApp.issueService", [])
  .factory('Issues', function($http) {
    var Issues = [];

    // Get all issues stored in the db
    var getAllIssues = function () {
      return $http({
        method: 'GET',
        url: '/issues/load',
      })
      .then(function(resp){
        return resp.data;
      })
      .catch(function(err){
        console.error(err);
      });
    };

    // Load any new issues referencing '@moonligher-bot'
    var loadIssues = function () {
      return $http({
        method: 'GET',
        url: '/issues',
      })
      .then(function(resp){
        return resp.data;
      })
      .catch(function(err){
        console.error(err);
      });
    };

    // Send issue data from service to the quest profile controller
    var getIssue = function() {
      return Issues.currentIssue;
    };

    // When an issue/quest is selected, store the quest data in this service
    var setIssue = function(issue){
      Issues.currentIssue = issue;
      return Issues.currentIssue;
    };

    // Allow user to join a quest they would like to work on
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
      })
      .catch(function(err){
        console.error(err);
      })
    }

    // Get all issues that a specific user has added to our app
    var getMyIssues = function(userID) {
      return $http({
        method: 'GET',
        url: '/issues/myissues?id=' + userID
      })
      .then(function(resp){
        return resp.data;
      })
      .catch(function(err){
        console.error(err);
      });
    };

    // Get the bounty information about a specific issue
    var getBounty = function(issueID) {
      return $http({
        method: 'GET',
        url: '/issues/bounty?id=' + issueID
      })
      .then(function(resp){
        return resp.data;
      })
      .catch(function(err){
        console.error(err);
      });
    };

    // Get all users who have joined a specific quest/issue
    var getMembers = function(issueID) {
      return $http({
        method: 'GET',
        url: '/issues/members?id=' + issueID
      })
      .then(function(resp){
        return resp.data;
      })
      .catch(function(err){
        console.error(err);
      });
    };

    // Close a quest and pay out corresponding bounty to the user who solved it
    var payAndClose = function(userID, amount, issueID) {
      return $http({
        method: 'POST',
        url: '/user/pay',
        data: {
          user_id: userID,
          amount: amount,
          issue_id: issueID
        }
      })
      .then(function(resp){
        return resp.data;
      })
      .catch(function(err){
        console.error(err);
      });
    };

    // Get all quests which have been joined by a specific user
    var getJoinedIssues = function(userID) {
      return $http({
        method: 'GET',
        url: '/issues/joined?id=' + userID
      })
      .then(function(resp){
        return resp.data;
      })
      .catch(function(err){
        console.error(err);
      });
    };

    return {
      getAllIssues: getAllIssues,
      loadIssues: loadIssues,
      getIssue: getIssue,
      setIssue: setIssue,
      addMember: addMember,
      getMyIssues: getMyIssues,
      getBounty: getBounty,
      getMembers: getMembers,
      payAndClose: payAndClose,
      getJoinedIssues: getJoinedIssues 
    };
  });


  