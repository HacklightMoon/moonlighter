'use strict';
angular.module('moonlighterApp.questProfile', [])
.controller('QuestProfileCtrl',function($location, $state, $scope, $cookies, Profile, User, Issues) {

  /******** Functions in this controller ********/
  $scope.setUser = setUser;
  $scope.joinQuest = joinQuest;
  $scope.closeQuest = closeQuest;

  // Set currentUser equal to the user data stored in cookies.
  $scope.currentUser = $cookies.getAll();

  // Get selected quest from quest feed => services
  $scope.chosenQuest = Issues.getIssue() || $location.search()
  console.log("The Quest you clicked on: ", $scope.chosenQuest);

  // Here, we store all of the quest data in the URL (for reloading)
  $location.search("title", $scope.chosenQuest.title);
  $location.search("user", $scope.chosenQuest.user);
  $location.search("user_id", $scope.chosenQuest.user_id);
  $location.search("body", $scope.chosenQuest.body);
  $location.search("id", $scope.chosenQuest.id);
  $location.search("created_at", $scope.chosenQuest.created_at);

  // Get bounty associated with selected quest and set it to questBounty variable
  // Also get all users who have joined an issue
  Issues.getBounty($scope.chosenQuest.id)
  .then(function(data){
    $scope.questBounty = data[0].bounty; // => integer
    $scope.questMembers = data[1] // => array of objects (id, github_username)
  })

  // Send the user info of the current quest owner to services,
  // for use in the user profile controller
  function setUser(user_id) {
    Profile.setUser(user_id);
  }
  $scope.setUser($scope.chosenQuest.user_id);

  // Allow users who aren't the quest owner to join a quest
  function joinQuest(user_id, quest_id) {
    Issues.addMember(quest_id, user_id);
    $state.go('questFeed');
  }
  
  // Allow quest owners/admins to close a quest and issue bounty
  function closeQuest() {
    if ($scope.userToPay) {
      Issues.payAndClose(Number($scope.userToPay), $scope.questBounty, $scope.chosenQuest.id);
      $state.go('questFeed');
    } else {
      $scope.errorMessage = "Please select the user who solved your issue"
    }
  }
  
  // Get all users who have joined the selected quest
  Issues.getMembers($scope.chosenQuest.id)
  .then(function(data) {
    $scope.questMembers = data;
    $scope.alreadyMember = false;
    for (var i=0; i<data.length; i++) {
      if (data[i].id === Number($scope.currentUser.user_id)) {
        $scope.alreadyMember = true;
      }
    }
  })
  .catch(function(err) {
    console.error(err);
  })
  
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
});
