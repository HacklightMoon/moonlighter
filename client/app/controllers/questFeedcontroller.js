
'use strict';
angular.module('moonlighterApp.questFeed', [])
.controller('QuestsFeedCtrl', function($scope, User, Issues, $cookies) {

  /******** Functions in this controller ********/
  $scope.selectIssue = selectIssue;
  $scope.getAllIssues = getAllIssues;

  // Show or hide the 'Add Quest' button based on sign-in
  $scope.seeAddQuest = false;
  if($cookies.getAll().user_id){
    $scope.seeAddQuest = true;
  }

  // Load all issues from github, and insert them into the database
  Issues.loadIssues()
  .then((data) => {
    $scope.getAllIssues();
  })
  .catch(function(err){
    console.error(err);
  });

  // Load all quests from the database
  function getAllIssues() {
    Issues.getAllIssues()
    .then((data) => {
      $scope.issues = data;
      for (var i=0; i<data.length; i++) {
        Issues.getBounty(data[i].id)
        .then((data) => {
          for (var i=0; i<$scope.issues.length; i++) {
            $scope.issues[i].bounty = data[0].bounty;
          }
        })
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }

  // When selecing an issue, send the selected issue to services
  // for use in other controllers
  function selectIssue(issue) {
    Issues.setIssue(issue);
  }
});
