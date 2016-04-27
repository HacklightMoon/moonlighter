'use strict';
angular.module('moonlighterApp.userProfile', [])
.controller('UserProfileCtrl', function ($scope, Profile) {
  $scope.editState = false;

  $scope.getUser = function() {
    $scope.currentUser = Profile.getUser();
  }

  $scope.getProfile = function(){
    console.log("Current User", $scope.currentUser);
    Profile.getProfile($scope.currentUser)
    .then(function(data){
      $scope.userData = data.data[0];
    })
    .catch(function(err){
      console.log(err);
    })
  }

  $scope.editProfile = function () {
    $scope.editState = true;
  }

  $scope.saveProfile = function() {
    
  }

  $scope.getUser();
  $scope.getProfile();
});