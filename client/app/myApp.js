'use strict';

angular.module('moonlighterApp', [
  'ui.router',
  'ngAnimate',
  'ngCookies',
  // 'moonlighterApp.services',
  'moonlighterApp.barracksService',
  'moonlighterApp.issueService',
  'moonlighterApp.profileService',
  'moonlighterApp.userService',
  'moonlighterApp.landing',
  'moonlighterApp.questFeed',
  'moonlighterApp.questProfile',
  'moonlighterApp.about',
  'moonlighterApp.newQuest',
  'moonlighterApp.header',
  'moonlighterApp.userProfile',
  ])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home',{
      url: '/',
      templateUrl: '/app/templates/landing.html',
      controller: 'LandingCtrl',
      controllerAs: 'landing'
    })
    .state('questFeed', {
      url: '/questfeed',
      templateUrl: '/app/templates/questFeed.html',
      controller: 'QuestsFeedCtrl',
      controllerAs: 'questFeed'
    })
    .state('questProfile', {
      url: '/questProfile',
      templateUrl: 'app/templates/quest.html',
      controller: 'QuestProfileCtrl',
      controllerAs: 'questProfile'
    })
    .state('userProfile', {
      url: '/userProfile',
      templateUrl: 'app/templates/userProfile.html',
      controller: 'UserProfileCtrl',
      controllerAs: 'userProfile'
    })
    .state('editProfile', {
      url: '/editProfile',
      templateUrl: 'app/templates/editProfile.html',
      controller: 'EditProfileCtrl',
      controllerAs: 'editProfile'
    })
    .state('newQuest', {
      url: '/newQuest',
      templateUrl: 'app/templates/newQuest.html',
      controller: 'NewQuestCtrl',
      controllerAs: 'newQuest'
    })
    .state('barracks',{
      url: '/barracks',
      templateUrl: 'app/templates/barracks.html',
      controller: 'BarracksCtrl',
      controllerAs: 'about'
    })
    .state('barracks',{
      url: '/barracks',
      views: {
        'header': {
          templateUrl: 'app/templates/partials/header.html',
          controller: 'HeaderCtrl',
          controllerAs: 'header'
        },
        'content': {
          templateUrl: 'app/templates/barracks.html',
          controller: 'BarracksCtrl',
          controllerAs: 'about'
        },
        'footer': {
          templateUrl: ''
        }
      }
    })
    .state('about', {
      url: '/about',
      templateUrl: 'app/templates/about.html',
      controller: 'AboutCtrl',
      controllerAs: 'about'
    });

    $urlRouterProvider.otherwise('/');
}]);


