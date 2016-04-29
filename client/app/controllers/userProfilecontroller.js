'use strict';
angular.module('moonlighterApp.userProfile', [])
.controller('UserProfileCtrl', function ($scope, Profile, User, $state) {
  $scope.editState = false;
  $scope.profileOwner = false;

  $scope.getUser = function() {
    $scope.currentUser = Profile.getUser();
  }
  $scope.getUser();

  $scope.getProfile = function(){
    console.log("Current User", $scope.currentUser);
    Profile.getProfile($scope.currentUser)
    .then(function(data){
      $scope.userData = data.data[0];
      User.getCurrentUser()
      .then(function(data){
        $scope.loggedInUser = data;
        if ($scope.loggedInUser.id === $scope.userData.id){
            $scope.profileOwner = true;
          }
      })
      .catch(function(err){
        console.error(err);
      })
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