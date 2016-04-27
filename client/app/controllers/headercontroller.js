'use strict';
angular.module('moonlighterApp.header',[])
.controller('HeaderCtrl',['$state', '$scope', function($state, $scope){
    $scope.seen = true;
    if($state.current.name==="home"){
      $scope.seen = false;
    };
    console.log($state);

    $scope.seeAbout = false;
    if($state.current.name==="home"){
      $scope.seeAbout = true;
    };
}]);

