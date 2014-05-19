// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'openfb',
  'starter.controllers', 
  'starter.services',
  'starter.directives',
  "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls",
  "com.2fdevs.videogular.plugins.overlayplay",
  "com.2fdevs.videogular.plugins.buffering",
  "com.2fdevs.videogular.plugins.poster"
])

.run(function ($rootScope, $state, $ionicPlatform, $window, OpenFB) {
  OpenFB.init('1417458451820697', 'http://ec2-54-85-146-44.compute-1.amazonaws.com/juke/oauthcallback.html');

  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if (toState.name !== "app.login" && toState.name !== "app.logout" && !$window.sessionStorage['fbtoken']) {
      $state.go('app.login');
      event.preventDefault();
    }
  });

  $rootScope.$on('OAuthException', function() {
    $state.go('app.login');
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.login', {
      url: "/login",
      views: {
        'menuContent': {
          templateUrl: "templates/login.html",
          controller: "LoginCtrl"
        }
      }
    })

    .state('app.logout', {
      url: "/logout",
      views: {
        'menuContent': {
          templateUrl: "templates/logout.html",
          controller: "LogoutCtrl"
        }
      }
    })

    .state('app.search', {
      url: "/parties/:partyId/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html",
          controller: 'PartySearchCtrl'
        }
      }
    })

    .state('app.newParty', {
      url: "/parties/new",
      views: {
        'menuContent' :{
          templateUrl: "templates/newParty.html",
          controller: 'NewParty'
        }
      }
    })

    .state('app.parties', {
      url: "/parties",
      views: {
        'menuContent' :{
          templateUrl: "templates/parties.html",
          controller: 'PartiesCtrl'
        }
      }
    })

    .state('app.party', {
      url: "/parties/:partyId",
      views: {
        'menuContent' :{
          templateUrl: "templates/party.html",
          controller: 'PartyCtrl'
        }
      }
    })

    .state('app.request', {
      url: '/parties/:partyId/requests/:requestId',
      views: {
        'menuContent' :{
          templateUrl: "templates/request.html",
          controller: 'RequestCtrl'
        }
      }
    })

    .state('app.player', {
      url: '/parties/:partyId/player',
      views: {
        'menuContent': {
          templateUrl: 'templates/player.html',
          controller: 'PlayerCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/parties');
});

