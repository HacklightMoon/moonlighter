'use strict';

angular.module('moonlighterApp', [
  'ui.router',
  'moonlighterApp.services',
  'moonlighterApp.landing',
  'moonlighterApp.questFeed',
  'moonlighterApp.questProfile'
  // 'moonlighterApp.userProfile',
  // 'moonlighterApp.signIn',
  // 'moonlighterApp.editProfile',
  // 'moonlighterApp.editQuest'
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
            templateUrl: 'app/templates/partials/header.html'
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
            templateUrl: 'app/templates/partials/header.html'
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
            templateUrl: 'app/templates/partials/header.html'
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
      url: 'templates/userProfile',
      views: {
        'header': {
          templateUrl: '/templates/partials/header.html'
        },
        'content': {
          templateUrl: 'partials/userProfile.html',
          controller: 'UserProfileCtrl',
          controllerAs: 'userProfile'
        },
        'footer': {
          templateUrl: ''
        }
      }
    })
    .state('app.editProfile', {
      url: 'partials/editProfile',
      templateUrl: 'partials/editProfile.html',
      controller: 'EditProfileCtrl',
      controllerAs: 'editProfile'
    })
    .state('editQuest', {
      url: 'partials/editQuest',
      templateUrl: 'partials/editQuest.html',
      controller: 'EditQuestCtrl'
    });
}]);