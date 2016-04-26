'use strict';
angular.module('moonlighterApp')
.controller('NewQuestCtrl', ['$scope', function($scope, Quest) {
  $scope.newQuest = {};

  $scope.addQuest = function () {
    $scope.titleRequired = '';
    $scope.descriptionRequired = '';
    $scope.techRequired = '';
    $scope.urlRequired = '';
    $scope.bountyRequired = '';

    if (!$scope.newQuest.title) {
      $scope.titleRequired = 'Title Required';
    }

    if (!$scope.newQuest.description) {
      $scope.descriptionRequired = 'Description Required';
    }

    if (!$scope.newQuest.tech) {
      $scope.techRequired = 'Tech Stack Required';
    }

    if (!$scope.newQuest.url) {
      $scope.urlRequired = 'URL Required';
    }

    if (!$scope.newQuest.bounty) {
      $scope.bountyRequired = 'Bounty Required';
    }

    var quest = {
      "type": "project",
      "description": $scope.newQuest.description,
      "title": $scope.newQuest.title,
      "tech": $scope.newQuest.tech.split(','),
      "url": $scope.newQuest.url,
      "bounty": $scope.newQuest.bounty
    }

    Quest.addQuest(quest).
    .then(function(data) {
      console.log('newQuestcontroller.js - Quest created?: ', data);
      $scope.newQuest.description = '';
      $scope.newQuest.title = '';
      $scope.newQuest.tech = '';
      $scope.newQuest.url = '';
      $scope.newQuest.bounty = '';
      
      $scope.questCreated = 'Quest Conjured!';
      $scope.questFailed = '';
    })
    .catch(function(err) {
      console.error(err);
      // $scope.questFailed = 'Failure...';
    })
  }
}]);