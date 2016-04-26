'use strict';
angular.module('moonlighterApp')
.controller('QuestsFeedCtrl', function QuestsFeedCtrl($scope, questData) {
    $scope.quest = questData.quest;
});
