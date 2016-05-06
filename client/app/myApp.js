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

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home',{
      url: '/',
      controller: 'HomeCtrl',
      controllerAs: 'home',
      views: {
        'header':{
            templateUrl: 'app/templates/partials/header.html',
            controller: 'HeaderCtrl',
            controllerAs: 'header'
        },
        'content' : {
          templateUrl: '/app/templates/landing.html',
          controller: 'LandingCtrl',
          controllerAs: 'landing'
        },
        'footer' : {
          templateUrl: ''
        }
      }
    })
    .state('questFeed', {
      url: '/questfeed',

        views: {
          'header': {
            templateUrl: 'app/templates/partials/header.html',
            controller: 'HeaderCtrl',
            controllerAs: 'header'
          },
          'content' : {
            templateUrl: '/app/templates/questFeed.html',
            controller: 'QuestsFeedCtrl',
            controllerAs: 'questFeed'
          },
          'footer' : {
            templateUrl: ''
          }
      }
    })
    .state('questProfile', {
      url: '/questProfile',
      views: {
      'header': {
            templateUrl: 'app/templates/partials/header.html',
            controller: 'HeaderCtrl',
            controllerAs: 'header'
      },
      'content' : {
        templateUrl: 'app/templates/quest.html',
        controller: 'QuestProfileCtrl',
        controllerAs: 'questProfile'
      },
      'footer': {
          templateUrl: ''
        },
      }
    })
    .state('userProfile', {
      url: '/userProfile',
      views: {
        'header': {
          templateUrl: 'app/templates/partials/header.html',
            controller: 'HeaderCtrl',
            controllerAs: 'header'
        },
        'content': {
          templateUrl: 'app/templates/userProfile.html',
          controller: 'UserProfileCtrl',
          controllerAs: 'userProfile'
        },
        'footer': {
          templateUrl: ''
        }
      }
    })
    .state('editProfile', {
      url: '/editProfile',
      templateUrl: 'app/templates/editProfile.html',
      controller: 'EditProfileCtrl',
      controllerAs: 'editProfile'
    })
    .state('newQuest', {
      url: '/newQuest',
      views: {
        'header': {
          templateUrl: 'app/templates/partials/header.html',
          controller: 'HeaderCtrl',
          controllerAs: 'header'
        },
        'content': {
          templateUrl: 'app/templates/newQuest.html',
          controller: 'NewQuestCtrl',
          controllerAs: 'newQuest'
        },
        'footer': {
          templateUrl: ''
        }
      }
    })
    .state('about', {
      url: '/about',
      views: {
        'header': {
          templateUrl: 'app/templates/partials/header.html',
          controller: 'HeaderCtrl',
          controllerAs: 'header'
        },
        'content': {
          templateUrl: 'app/templates/about.html',
          controller: 'AboutCtrl',
          controllerAs: 'about'
        },
        'footer': {
          templateUrl: ''
        }
      }
    });
}]);


