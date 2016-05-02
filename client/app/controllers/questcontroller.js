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

  // $scope.deleteQuest = function() {
  //   Quest.deleteQuest($scope.chosenQuest.id);
  // }

  $scope.joinQuest = function(user_id, quest_id) {
    // TODO: Fill me in...
    console.log("Parameters passed into joinQuest:", user_id, quest_id);
  }

  $scope.closeQuest = function() {
    // TODO: Fill me in...
    // This function should cause a dropdown menu to display.
    // Upon selecting a username from the menu,
    // Quests.deleted should be true, and rupees should be
    // paid out to the selected user
  }
});