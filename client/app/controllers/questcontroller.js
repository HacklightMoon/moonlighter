'use strict';
angular.module('moonlighterApp.questProfile', [])
.controller('QuestProfileCtrl',function($scope, $cookies, Profile, User, Issues) {

  // Set currentUser equal to the user data stored in cookies.
  $scope.currentUser = $cookies.getAll();

  // Get selected quest from quest feed => services
  $scope.chosenQuest = Issues.getIssue()
  console.log("The Quest you clicked on: ", $scope.chosenQuest);

  // Get bounty associated with selected quest and set it to questBounty variable
  Issues.getBounty($scope.chosenQuest.id)
  .then(function(data){
    $scope.questBounty = data.bounty;
  })
  
  // Get all users who have joined an issue
  Issues.getMembers($scope.chosenQuest.id)
  .then(function(data) {
    console.log("DATA FROM GETMEMBERS:", data);
    $scope.questMembers = data;
  })

  // Send the user info of the current quest owner to services,
  // for use in the user profile controller
  $scope.setUser = function(user_id) {
    Profile.setUser(user_id);
  }
  $scope.setUser($scope.chosenQuest.user_id);

  // If the current user owns the selected quest, show certain buttons
  $scope.questOwner = false;
  if ($scope.currentUser.user_id == $scope.chosenQuest.user_id){
    $scope.questOwner = true;
  }
  
  // If the quest is closed & curent user is the quest owner, show Close Quest button
  $scope.closedStatus = false;
  if ($scope.chosenQuest.status === 'closed') {
    $scope.closedStatus = true;
  }

  // If the user is signed in, and is not the quest owner, show Join Quest button
  $scope.signedIn = false;
  if ($scope.currentUser.length > 0) {
    $scope.signedIn = true;
  }

  // Allow users who aren't the quest owner to join a quest
  $scope.joinQuest = function(user_id, quest_id) {
    Issues.addMember(quest_id, user_id);
  }
  
  // Allow quest owners/admins to close a quest and issue bounty
  $scope.closeQuest = function() {
    // TODO: Fill me in...
    // This function should cause a dropdown menu to display.
    // Upon selecting a username from the menu,
    // Quests.deleted (in db) should be true, and rupees should be
    // paid out to the selected user
  }
});
