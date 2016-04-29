'use strict';
angular.module('moonlighterApp.questProfile', [])
.controller('QuestProfileCtrl',function($scope, Quest, Profile) {
  $scope.retrieveQuest = function() {
    $scope.chosenQuest = Quest.getQuest()
    console.log($scope.chosenQuest);
  };
  $scope.retrieveQuest();

  $scope.setUser = function(user_id) {
    Profile.setUser(user_id);
  }
  $scope.setUser($scope.chosenQuest.user_id);

  $scope.deleteQuest = function() {
    Quest.deleteQuest($scope.chosenQuest.id);
  }
});