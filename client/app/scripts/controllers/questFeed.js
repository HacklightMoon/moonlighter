'use strict';
angular.module('moonlighterApp')
.controller('ShowsController', ['$scope','ShowsService', function($scope, ShowsService) {
    $scope.quest = ShowsService.list();
 }]);
