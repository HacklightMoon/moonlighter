'use strict';
angular.module('moonlighterApp.questFeed', [])
.controller('QuestsFeedCtrl',function($scope, Quest, User, Issues, $cookies) {

  // $scope.getAllQuests = function() {
  //   Quest.getAllQuests()
  //   .then(function(data) {
  //       $scope.quests = data;
  //   })
  //   .catch(function(err){
  //     console.error(err);
  //   });
  // };
  $scope.seeAddQuest = false;
  $scope.userPrivilege = function(){
    if($cookies.getAll().user_id){
      $scope.seeAddQuest = true;
    }
  };

  // $scope.getAllQuests();

  // $scope.selectQuest=function(quest) {
  //   Quest.setQuest(quest);
  // };
  $scope.userPrivilege();

  $scope.getAllIssues = function() {
    Issues.getAllIssues()
    .then(function(data) {
        console.log("data from questFeedCTRL:",data);
        $scope.issues = data;
    })
    .catch(function(err){
      console.error(err);
    });
  };

  Issues.loadIssues()
  .then(function(data) {
    console.log("Issues loaded: ", data);
    $scope.getAllIssues();
  })
  .catch(function(err){
    console.error(err);
  })


  $scope.selectIssue = function(issue) {
    Issues.setIssue(issue);
  }
});