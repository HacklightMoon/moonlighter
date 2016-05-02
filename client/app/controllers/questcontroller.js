'use strict';
angular.module('moonlighterApp.questProfile', [])
.controller('QuestProfileCtrl',function($scope, $cookies, Quest, Profile, User, Issues) {

  $scope.retrieveQuest = function() {
    $scope.chosenQuest = Issues.getIssue()
    console.log("The Quest you clicked on: ", $scope.chosenQuest);
  };
  $scope.retrieveQuest();

  $scope.setUser = function(user_id) {
    Profile.setUser(user_id);
  }
  $scope.setUser($scope.chosenQuest.user_id);


  $scope.currentUser = $cookies.getAll();
  $scope.questOwner = false;
  if ($scope.currentUser.user_id == $scope.chosenQuest.user_id){
    $scope.questOwner = true;
  }


  $scope.deleteQuest = function() {
    Quest.deleteQuest($scope.chosenQuest.id);
  }
});