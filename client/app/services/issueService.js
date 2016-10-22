
'use strict';
angular.module("moonlighterApp.issueService", [])
  .factory('Issues', function($http) {
    var Issues = [];

    // Get all issues stored in the db
    const getAllIssues =  () => {
      return $http({
        method: 'GET',
        url: '/issues/load',
      })
      .then((resp) =>{
        return resp.data;
      })
      .catch((err) =>{
        console.error(err);
      });
    };

    // Load any new issues referencing '@moonligher-bot'
    const loadIssues = () => {
      return $http({
        method: 'GET',
        url: '/issues',
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.error(err);
      });
    };

    // Send issue data from service to the quest profile controller
    const getIssue = () => {
      return Issues.currentIssue;
    };

    // When an issue/quest is selected, store the quest data in this service
    const setIssue = (issue) => {
      Issues.currentIssue = issue;
      return Issues.currentIssue;
    };

    // Allow user to join a quest they would like to work on
    const addMember = (issueID, userID) => {
      return $http({
        method: 'POST',
        url: '/issues/addmember',
        data: {
          issue_id: issueID,
          user_id: userID
        }
      })
      .then((data) {
      })
      .catch((err) => {
        console.error(err);
      })
    }

    // Get all issues that a specific user has added to our app
    const getMyIssues = (userID) => {
      return $http({
        method: 'GET',
        url: '/issues/myissues?id=' + userID
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.error(err);
      });
    };

    // Get the bounty information about a specific issue
    const getBounty = (issueID) => {
      return $http({
        method: 'GET',
        url: '/issues/bounty?id=' + issueID
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.error(err);
      });
    };

    // Get all users who have joined a specific quest/issue
    const getMembers = (issueID) => {
      return $http({
        method: 'GET',
        url: '/issues/members?id=' + issueID
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.error(err);
      });
    };

    // Close a quest and pay out corresponding bounty to the user who solved it
    const payAndClose = (userID, amount, issueID) => {
      return $http({
        method: 'POST',
        url: '/user/pay',
        data: {
          user_id: userID,
          amount: amount,
          issue_id: issueID
        }
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.error(err);
      });
    };

    // Get all quests which have been joined by a specific user
    const getJoinedIssues = (userID) => {
      return $http({
        method: 'GET',
        url: '/issues/joined?id=' + userID
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
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
