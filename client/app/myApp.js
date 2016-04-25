'use strict';

angular.module('moonlighterApp', [
  'ui.router',
  // 'moonlighterApp.landing',
  // 'moonlighterApp.signIn',
  // 'moonlighterApp.questFeed',
  // 'moonlighterApp.questProfile',
  // 'moonlighterApp.userProfile',
  // 'moonlighterApp.editProfile',
  // 'moonlighterApp.editQuest'
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
      url: 'partials/signIn',
      templateUrl: 'partials/signIn.html',
      controller: 'SignInCtrl'
    })
    .state('questFeed', {
      url: 'partials/questFeed',
      templateUrl: 'partials/questFeed.html',
      controller: 'QuestFeedCtrl'
    })
    .state('questProfile', {
      url: 'partials/questProfile',
      templateUrl: 'partials/questProfile.html',
      controller: 'QuestProfileCtrl'
    })
    .state('userProfile', {
      url: 'partials/userProfile',
      templateUrl: 'partials/userProfile.html',
      controller: 'UserProfileCtrl'
    })
    .state('editProfile', {
      url: 'partials/editProfile',
      templateUrl: 'partials/editProfile.html',
      controller: 'EditProfileCtrl'
    })
    .state('editQuest', {
      url: 'partials/editQuest',
      templateUrl: 'partials/editQuest.html',
      controller: 'EditQuestCtrl'
    });
}]);