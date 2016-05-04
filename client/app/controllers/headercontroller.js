'use strict';
angular.module('moonlighterApp.header',[])
.controller('HeaderCtrl',['$state', '$scope', 'User', 'Profile', '$cookies', function($state, $scope, User, Profile, $cookies){
  
  $scope.seen = true;
  if($state.current.name==="home"){
    $scope.seen = false;
  };

  $scope.seeAbout = false;
  if($state.current.name==="home"){
    $scope.seeAbout = true;
  };

  $scope.signIn = function() {
    User.getCurrentUser()
    .then(function(data) {
      if (data) {
        $scope.isLogin = true;
        $cookies.put('username', data.github_username);
        $cookies.put('user_id', data.id);
        $cookies.put('picture', data.profile_picture);
        $cookies.put('passid', data.passid);
        $scope.username = data.github_username;
        $scope.user_id = data.id;
        $scope.photo = data.profile_picture;
        // Profile.setUser($scope.user_id);  // added this
      }
    })
    // .catch(function(err) {
    //   console.error(err);
    // })
  }

  // This function should send the selected user to the services
  // Then it should redirect you to the user profile view
  // IT DOESN"T COMPLETELY WORK YET!!!
  $scope.setUser = function () {
    Profile.setUser($scope.user_id)
    .then(function() {
      $state.go("userProfile");
    })
  }

  $scope.logOut = function() {
    $cookies.remove('username');
    $cookies.remove('user_id');
    $cookies.remove('picture');
    $cookies.remove('passid');
  }

  // if (!$scope.isLogin) {
  //   $scope.logOut();
  // }
  $scope.signIn();
}]);
