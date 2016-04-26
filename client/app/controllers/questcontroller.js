'use strict';
angular.module('moonlighterApp.questProfile', [])
.controller('QuestProfileCtrl',function($scope, Quest) {
  $scope.retrieveQuest = function() {
    $scope.chosenQuest = Quest.getQuest();
    console.log($scope.chosenQuest);
  };
  $scope.retrieveQuest();
});