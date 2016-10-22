
'use strict';
angular.module('moonlighterApp.main',[])
.controller('MainCtrl',['$scope', '$rootScope', ($scope, $rootScope) => {
  $rootScope.$on('$stateChangeStart',
  function(event, toState, toParams, fromState, fromParams){
    $scope.backgroundClass = toState.name
  })
}]);
