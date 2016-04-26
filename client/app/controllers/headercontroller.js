'use strict';
angular.module('moonlighterApp.header',[])
.controller('HeaderCtrl',['$state', '$scope', function($state, $scope){
    console.log($state.get());
}]);


// $state.$current.name = 'contacts.details.item';
 
// // absolute name
// $state.is('contact.details.item'); // returns true
// $state.is(contactDetailItemStateObject); // returns true'HeaderCtrl', function($scope, $state, $current) {
  // $scope.cloakLogo = function($state){
  //   return $state.$current.name;
  // };
  // console.log($scope.cloakLogo());