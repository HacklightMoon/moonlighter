'use strict';
angular.module('moonlighterApp.nav',[])
.controller('NavCtrl',['$state', '$scope', 'User', 'Profile', '$cookies', 'toastr', function($state, $scope, User, Profile, $cookies, toastr){

  // If a user is already authenticated, then get their info from cookies
  if ($cookies.getAll().user_id && !$scope.isLogin) {
    $scope.isLogin = true;
    $scope.username = $cookies.get('username');
    $scope.user_id = $cookies.get('user_id');
    $scope.photo = $cookies.get('picture');

    // Get unseen contributions to show a notification
    User.newContribs($scope.username)
    .then(function(data) {
      $scope.unseenContribs = data[0].unseenContribs;
      if ($scope.unseenContribs > 0) {
        if ($scope.unseenContribs !== 1){
          toastr.success('You have ' + $scope.unseenContribs + ' new contributions!', {
            closeButton: true,
            autoDismiss: false,
            timeOut: 10000,
            extendedTimeOut: 2000
          });
        } else {
          toastr.success('You have ' + $scope.unseenContribs + ' new contribution!', {
            closeButton: true,
            autoDismiss: false,
            timeOut: 10000,
            extendedTimeOut: 2000
          });
        }
      } 
    })
  } 

  // If a user just authenticated and was redirected from github, get their data
  if (!$scope.isLogin && !$cookies.getAll().user_id) {
    User.getCurrentUser()
    .then(function(data) {
      if (data) {
        $scope.isLogin = true;

        $cookies.put('username', data.github_username);
        $cookies.put('user_id', data.id);
        $cookies.put('picture', data.profile_picture);

        $scope.username = data.github_username;
        $scope.user_id = data.id;
        $scope.photo = data.profile_picture;

        $scope.contributions = data.contributions;
        $scope.unseenContribs = data.unseenContribs;
        
        // Get unseen contributions to show a notification
        User.newContribs($scope.username)
        .then(function(data) {
          $scope.unseenContribs = data[0].unseenContribs;
          
          if ($scope.unseenContribs > 0) {
            if ($scope.unseenContribs !== 1){
              toastr.success('You have ' + $scope.unseenContribs + ' new contributions!', {
                closeButton: true,
                autoDismiss: false,
                timeOut: 10000,
                extendedTimeOut: 2000
              });
            } else {
              toastr.success('You have ' + $scope.unseenContribs + ' new contribution!', {
                closeButton: true,
                autoDismiss: false,
                timeOut: 10000,
                extendedTimeOut: 2000
              });
            }
          } 
        })
      }
    })
    .catch(function(err) {
      console.error(err);
    })
  }

  $scope.seen = true;
  if($state.current.name==="home"){
    $scope.seen = false;
  };

  $scope.seeAbout = false;
  if($state.current.name==="home" || $state.current.name==="questFeed"){
    $scope.seeAbout = true;
  };
  
  // Remove notification when navigating away from the landing page
  $scope.removeNotification = function() {
    User.resetContribs($scope.user_id);
    User.getContribs($scope.user_id);
    $scope.newContribs = 0;
  }

  // Send the selected user to the services
  // Then redirect to the user profile view
  $scope.setUser = function () {
    Profile.setUser($scope.user_id)
    $state.go("userProfile");
  }

  // Remove cookies and notification when logging out
  $scope.logOut = function() {
    console.log("LOGGING OUT....");
    $scope.removeNotification();
    $cookies.remove('username');
    $cookies.remove('user_id');
    $cookies.remove('picture');
  }

}]);
