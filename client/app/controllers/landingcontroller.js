
'use strict';
angular.module('moonlighterApp.landing',[])
.controller('LandingCtrl', ['$scope', '$state', 'Issues', 'User', 'Profile', '$cookies', function($scope, $state, Issues, User, Profile, $cookies) {

  Issues.loadIssues()
  .catch((err) => {
    console.error(err);
  });
}]);
