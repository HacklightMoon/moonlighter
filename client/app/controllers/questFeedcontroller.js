'use strict';
angular.module('moonlighterApp.questFeed', [])
.controller('QuestsFeedCtrl',function($scope, $cookies, Quest, User) {
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
    if($cookies.getAll().user_id){
      $scope.seeAddQuest = true;
    }
  };

  $scope.getAllQuests();

  $scope.selectQuest=function(quest) {
    Quest.setQuest(quest);
  };
  $scope.userPrivilege();
});