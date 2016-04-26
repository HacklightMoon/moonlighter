'use strict';
angular.module('moonlighterApp.questFeed', [])
.controller('QuestsFeedCtrl', function($scope, Quest) {
  $scope.getAllQuests = function() {
    Quest.getAllQuests()
    .then(function(data) {
        console.log("data from questFeedCTRL:",data);
        $scope.quests = data;
    })
    .catch(function(err){
      console.error(err);
    });
  };
  $scope.getAllQuests();

  $scope.selectQuest=function(quest) {
    Quest.setQuest(quest);
  };
});
