'use strict';
angular.module('moonlighterApp.questProfile', [])
.controller('QuestProfileCtrl',function($state, $scope, $cookies, Profile, User, Issues) {

  // Set currentUser equal to the user data stored in cookies.
  $scope.currentUser = $cookies.getAll();

  // Get selected quest from quest feed => services
  $scope.chosenQuest = Issues.getIssue()
  console.log("The Quest you clicked on: ", $scope.chosenQuest);

  // Get bounty associated with selected quest and set it to questBounty variable
  // Also get all users who have joined an issue
  Issues.getBounty($scope.chosenQuest.id)
  .then(function(data){
    $scope.questBounty = data[0].bounty; // => integer
    $scope.questMembers = data[1] // => array of objects (id, github_username)
  })

  // Send the user info of the current quest owner to services,
  // for use in the user profile controller
  $scope.setUser = function(user_id) {
    Profile.setUser(user_id);
  }
  $scope.setUser($scope.chosenQuest.user_id);

  // If the current user owns the selected quest, show certain buttons
  // If the quest is closed & curent user is the quest owner, show Close Quest button
  // If the user is signed in, and is not the quest owner, show Join Quest button
  $scope.questOwner = false;
  $scope.closedStatus = false;
  $scope.signedIn = false;
  if ($scope.currentUser.user_id == $scope.chosenQuest.user_id){
    $scope.questOwner = true;
  }
  if ($scope.chosenQuest.status === 'closed') {
    $scope.closedStatus = true;
  }
  if ($scope.currentUser.user_id) {
    $scope.signedIn = true;
  }
  
  // Allow users who aren't the quest owner to join a quest
  $scope.joinQuest = function(user_id, quest_id) {
    Issues.addMember(quest_id, user_id);
  }
  
  // Allow quest owners/admins to close a quest and issue bounty
  $scope.closeQuest = function() {
    if ($scope.userToPay) {
      Issues.payAndClose(Number($scope.userToPay), $scope.questBounty, $scope.chosenQuest.id);
      $state.go('questFeed')
    } else {
      $scope.errorMessage = "Please select the user who solved your issue"
    }
  }
});
