'use strict';
angular.module('moonlighterApp.landing',[])
.controller('LandingCtrl', ['$scope', 'Issues', function($scope, Issues) {
  
  Issues.loadIssues()
  .catch(function(err){
    console.error(err);
  })

}])

// ng-model="checked" ng-init="checked=true"

// <span ng-if="checked" class="animate-if">
//   This is removed when the checkbox is unchecked.
// </span>

// $state.current.name