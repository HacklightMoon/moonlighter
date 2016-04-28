'use strict';
angular.module('moonlighterApp.header',[])
.controller('HeaderCtrl',['$state', '$scope', 'User', function($state, $scope, User){
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
        console.log("Data from getCurrentUser: ", data);
      })
      .catch(function(err) {
        console.error(err);
      })
    }

    $scope.signIn();
}]);

