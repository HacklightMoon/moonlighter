angular.module('moonlighterApp.main',[])
.controller('MainCtrl',['$scope', '$rootScope', function($scope, $rootScope){
  
  $rootScope.$on('$stateChangeStart', 
  function(event, toState, toParams, fromState, fromParams){ 
    $scope.backgroundClass = toState.name
  })

}]);