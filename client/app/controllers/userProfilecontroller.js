'use strict';
angular.module('moonlighterApp.userProfile', [])
.controller('UserProfileCtrl', function ($scope, Profile, User, $state, $cookies, Issues) {
  $scope.editState = false;
  $scope.profileOwner = false;

  // currentUser is the user_id of the user whose profile we're viewing.
  $scope.currentUser = Profile.getUser();
  
  // We use the above variable to retrieve issues posted by this user.
  Issues.getMyIssues($scope.currentUser)
  .then(function(data) {
    // This myIssues variable is equal to an array of objects.
    $scope.myIssues = data;
    console.log("My issues: ", data);
  })

  $scope.getProfile = function(){
    console.log("Current User", $scope.currentUser);
    Profile.getProfile($scope.currentUser)
    .then(function(data){
      $scope.userData = data.data[0];
      $scope.loggedInUser = $cookies.getAll();
      if ($scope.loggedInUser.user_id == $scope.userData.id) {
        $scope.profileOwner = true;
      }
    })
    .catch(function(err){
      console.log(err);
    })
  }


  $scope.editProfile = function () {
    $scope.editState = true;
  }

  $scope.saveProfile = function() {
    $scope.newRole = $scope.userData.role;
    $scope.newEmail = $scope.userData.email;
    if ($scope.userData.skills.includes(', ')) {
      $scope.newSkills = $scope.userData.skills.split(', ');
    } else {
      $scope.newSkills = $scope.userData.skills.split(',');
    }

    let obj = {
      id: $scope.loggedInUser.passid,
      form: {
        email: $scope.newEmail,
        role: $scope.newRole,
        skills: $scope.newSkills
      }
    }

    User.updateUserInfo(obj)
    .then(function(data) {
      $state.go('questFeed');
    })
    .catch(function(err) {
      console.error(err);
    })
  }
  $scope.getProfile();
});