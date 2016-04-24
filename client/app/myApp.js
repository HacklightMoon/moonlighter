'use strict';
var moonlighterApp = angular.module('moonlighterApp', [
  'ui.router'
  ])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/landing');
  $stateProvider
    .state('landing', {
      url: 'partials/landing',
      templateUrl: 'partials/landing.html',
      controller: 'LandingCtrl'
    })
    .state('signIn', {
      url: '/signIn',
      templateUrl: 'partials/signIn.html',
      controller: 'SignInCtrl'
    })
    .state('questFeed', {
      url: '/questFeed',
      templateUrl: 'partials/questFeed.html',
      controller: 'QuestFeedCtrl'
    })
    .state('questProfile', {
      url: '/questProfile',
      templateUrl: 'partials/questProfile.html',
      controller: 'QuestProfileCtrl'
    })
    .state('userProfile', {
      url: '/userProfile',
      templateUrl: 'partials/userProfile.html',
      controller: 'UserProfileCtrl'
    })
    .state('editProfile', {
      url: '/editProfile',
      templateUrl: 'partials/editProfile.html',
      controller: 'EditProfileCtrl'
    })
    .state('editQuest', {
      url: '/editQuest',
      templateUrl: 'partials/editQuest.html',
      controller: 'EditQuestCtrl'
    });
}]);