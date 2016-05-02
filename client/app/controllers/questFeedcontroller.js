'use strict';
angular.module('moonlighterApp.questFeed', [])
.controller('QuestsFeedCtrl',function($scope, Quest, User, Issues, $cookies) {

  $scope.seeAddQuest = false;
  $scope.userPrivilege = function(){
    if($cookies.getAll().user_id){
      $scope.seeAddQuest = true;
    }
  };

  $scope.userPrivilege();

  $scope.getAllIssues = function() {
    Issues.getAllIssues()
    .then(function(data) {
        $scope.issues = data;
    })
    .catch(function(err){
      console.error(err);
    });
  };

  Issues.loadIssues()
  .then(function(data) {
    $scope.getAllIssues();
  })
  .catch(function(err){
    console.error(err);
  })


  $scope.selectIssue = function(issue) {
    Issues.setIssue(issue);
  }
});


  // $scope.getAllQuests = function() {
  //   Quest.getAllQuests()
  //   .then(function(data) {
  //       $scope.quests = data;
  //   })
  //   .catch(function(err){
  //     console.error(err);
  //   });
  // };


  // $scope.getAllQuests();

  // $scope.selectQuest=function(quest) {
  //   Quest.setQuest(quest);
  // };