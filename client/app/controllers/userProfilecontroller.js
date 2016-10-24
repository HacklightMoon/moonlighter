
'use strict';
angular.module('moonlighterApp.userProfile', [])
.controller('UserProfileCtrl', function($location, $scope, Profile, User, $state, $cookies, Issues) {

  /******** Functions in this controller ********/
  $scope.getCharacter = getCharacter;
  $scope.selectIssue = selectIssue;

  // selectedUser is the user_id of the user whose profile we're viewing.
  $scope.selectedUser = Profile.getUser() || $location.search().id;

  // Here, we store the current user_id inside of the URL (for reloading)
  $location.search("id", $scope.selectedUser);
  console.log("Current User: ", $scope.selectedUser);

  // We use the above variable to retrieve issues posted by this user.
  Issues.getMyIssues($scope.selectedUser)
  .then((data) => {
    // This myIssues variable is equal to an array of issue-objects.
    $scope.myIssues = data;
  });

  Issues.getJoinedIssues($scope.selectedUser)
  .then((data) => {
    // This joinedIssues variable is equal to an array of issue-objects.
    $scope.joinedIssues = data;
  });

  // Gets user's character
  function getCharacter(level) {
    Profile.getCharacter(level)
    .then((character) => {
      console.log("this is your character in UserProfileCtrl!!!!!!!!", character)
      $scope.character = character.data.character
      $scope.level = character.data.level
      $scope.name = character.data.character_name
    })
    .catch((err) => {
      console.error(err);
    });
  };

  // Get selected profile from quest controller => services
  // Also, allow profile owner to view certain buttons/divs
  Profile.getProfile($scope.selectedUser)
  .then((data) => {
    $scope.userData = data.data[0];
    $scope.currentUser = $cookies.getAll();
    $scope.profileOwner = false;
    if ($scope.currentUser.user_id == $scope.userData.id) {
      $scope.profileOwner = true;
    }
  })
  .then(function() {
    $scope.getCharacter($scope.userData.level);
  })
  .catch((err) => {
    console.log(err);
  });

  // When selecing an issue, send the selected issue to services
  // for use in other controllers
  function selectIssue(issue) {
    Issues.setIssue(issue);
  }
});
