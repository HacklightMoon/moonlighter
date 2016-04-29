'use strict';
angular.module('moonlighterApp.questProfile', [])
.controller('QuestProfileCtrl',function($scope, Quest, Profile, User) {

  $scope.retrieveQuest = function() {
    $scope.chosenQuest = Quest.getQuest()
    console.log($scope.chosenQuest);
  };
  $scope.retrieveQuest();

  $scope.setUser = function(user_id) {
    Profile.setUser(user_id);
  }
  $scope.setUser($scope.chosenQuest.user_id);

  User.getCurrentUser()
  .then(function(data){
    console.log("Quest Controller - line 18", data);
    $scope.currentUser = data;
    $scope.questOwner = false;
    if ($scope.currentUser.id === $scope.chosenQuest.user_id){
      $scope.questOwner = true;
    }
  })
  .catch(function(err){
    console.error(err);
  })

  $scope.deleteQuest = function() {
    Quest.deleteQuest($scope.chosenQuest.id);
  }
});