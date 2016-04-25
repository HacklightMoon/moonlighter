'use strict';
var moonlighterApp = angular.module('moonlighterApp', [
  'ui.router'
  ]);

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
    .state('app',{
      url: '/',
      views: {
        'header':{
            templateUrl: '/templates/partials/header.html'
        },
        'content' : {
          templateUrl: 'templates/landing.html',
          controller: 'LandingCtrl'
        },
        'footer' : {
          templateUrl: 'templates/partials/footer.html'
        }
      }
    })

    .state('app.questFeed', {
      url: 'questFeed',
      views: {
        'header': {
          templateUrl: '/templates/partials/header.html'
        },
        'content': {
          templateUrl: '/templates/questFeed.html',
          controller: 'QuestFeedCtrl'
        }
      }      
    })
    .state('app.questProfile', {
      url: 'questProfile',
      templateUrl: 'templates/questProfile.html',
      controller: 'QuestProfileCtrl'
    })
    .state('app.userProfile', {
      url: 'templates/userProfile',
      views: {
        'header': {
          templateUrl: '/templates/partials/header.html'
        },
        'content': {
          templateUrl: 'partials/userProfile.html',
          controller: 'UserProfileCtrl'
        }
      }
    })
    .state('app.editProfile', {
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