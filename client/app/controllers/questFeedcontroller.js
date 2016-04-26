'use strict';
angular.module('moonlighterApp.questFeed', [])
.controller('QuestsFeedCtrl', function($scope, Quest) {
  $scope.getAllQuests = function() {
    Quest.getAllQuests()
    .then(function(data) {
        console.log("data from questFeedCTRL:",data);
    })
    .catch(function(err){
      console.error(err);
    });
  };
  $scope.getAllQuests();
});
