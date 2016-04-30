'use strict';
angular.module('moonlighterApp.header',[])
.controller('HeaderCtrl',['$state', '$scope', 'User', '$cookies', function($state, $scope, User, $cookies){
  $scope.seen = true;
    if($state.current.name==="home"){
      $scope.seen = false;
    };

    console.log($cookies.getAll())

    $scope.seeAbout = false;
    if($state.current.name==="home"){
      $scope.seeAbout = true;
    };

    $scope.signIn = function() {
      User.getCurrentUser()
      .then(function(data) {
        console.log("Data from getCurrentUser: ", data);
        if (data) {
          $scope.isLogin = true;
          $scope.currentUser = data;
        } else {
          $scope.currentUser = undefined;
        }
      })
      .catch(function(err) {
        console.error(err);
      })
    }

    $scope.signIn();
}]);
