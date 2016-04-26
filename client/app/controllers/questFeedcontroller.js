'use strict';
angular.module('moonlighterApp')
.controller('QuestsFeedCtrl', function($scope, questData) {
    $scope.quest = questData.quest;
});
