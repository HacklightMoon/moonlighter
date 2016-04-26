'use strict';
angular.module('moonlighterApp.userProfile', [])
.controller('UserProfileCtrl', function ($scope, Profile) {
  $scope.editState = false;

  $scope.getProfile = function(){
    Profile.getProfile()
    .then(function(data){
      console.log("DATA99999 ", data);
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

});