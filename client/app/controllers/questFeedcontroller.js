'use strict';
angular.module('moonlighterApp.questFeed', [])
.controller('QuestsFeedCtrl',function($scope, Quest, User) {
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
  $scope.seeAddQuest = false;
  $scope.userPrivilege = function(){
    User.getCurrentUser()
    .then(function(data) {
      if(data){
        $scope.seeAddQuest = true;
      }
    })
    .catch(function(err) {
      console.error(err);
    });
  };

 
  $scope.getAllQuests();

  $scope.selectQuest=function(quest) {
    Quest.setQuest(quest);
  };
  $scope.userPrivilege();
});