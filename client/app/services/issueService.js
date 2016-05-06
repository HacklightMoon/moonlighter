 angular.module("moonlighterApp.issueService", [])
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
        console.error(err);
      });
    };

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

    var getIssue = function() {
      return Issues.currentIssue;
    };

    var setIssue = function(issue){
      Issues.currentIssue = issue;
      return Issues.currentIssue;
    };

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
        console.error(err);
      });
    };

    var getBounty = function(issueID) {
      return $http({
        method: 'GET',
        url: '/issues/bounty?id=' + issueID
      })
      .then(function(resp){
        console.log('Response in service.js: ', resp);
        return resp.data;
      })
      .catch(function(err){
        console.error(err);
      });
    };

    var getMembers = function(issueID) {
      return $http({
        method: 'GET',
        url: '/issues/members?id=' + issueID
      })
      .then(function(resp){
        console.log('Response in service.js: ', resp);
        return resp.data;
      })
      .catch(function(err){
        console.error(err);
      });
    };

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
        console.log('Response in service.js: ', resp);
        return resp.data;
      })
      .catch(function(err){
        console.error(err);
      });
    };

    var getJoinedIssues = function(userID) {
      return $http({
        method: 'GET',
        url: '/issues/joined?id=' + userID
      })
      .then(function(resp){
        console.log('Response in service.js: ', resp);
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


  