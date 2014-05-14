// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic', 
  'starter.controllers', 
  'starter.services',
  'starter.directives',
  "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls",
  "com.2fdevs.videogular.plugins.overlayplay",
  "com.2fdevs.videogular.plugins.buffering",
  "com.2fdevs.videogular.plugins.poster"
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
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

    .state('app.search', {
      url: "/parties/:partyId/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html",
          controller: 'PartySearchCtrl'
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
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
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/parties');
});

