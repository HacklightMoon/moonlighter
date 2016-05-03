'use strict';
angular.module('moonlighterApp.header',[])
.controller('HeaderCtrl',['$state', '$scope', 'User', '$cookies', function($state, $scope, User, $cookies){
  
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
      }
    })
    // .catch(function(err) {
    //   console.error(err);
    // })
  }

  $scope.logOut = function() {
    $cookies.remove('username');
    $cookies.remove('user_id');
    $cookies.remove('picture');
    $cookies.remove('passid');
  }

  if (!$scope.isLogin) {
    $scope.logOut();
  }
  $scope.signIn();
}]);
