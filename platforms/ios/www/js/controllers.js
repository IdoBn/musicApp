angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('PartiesCtrl', function($scope, Party) {
  Party.getParties().success(function(data) {
    $scope.parties = data.party;
  });
})

.controller('PartyCtrl', function($scope, $stateParams, Party) {
  $scope.id = $stateParams.partyId;
  Party.getParty($scope.id).success(function(data) {
    $scope.party = data.party;
  });

  $scope.doRefresh = function() {
    Party.getParty($scope.id).success(function(data) {
      $scope.party = data.party;
    })
    .finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
   });
  };
})

.controller('PartySearchCtrl', function($scope, Party, $stateParams, $ionicViewService) {
  $scope.id = $stateParams.partyId;
  $scope.doSearch = function(query) {
    Party.search($scope.id, query).success(function(data) {
      $scope.searchResults = data;
    }); 
  };
  $scope.createRequest = function(song) {
    Party.createRequest(song, $scope.id).success(function(data) {
    });
    var backView = $ionicViewService.getBackView();
    backView && backView.go();
  };
})

.controller('RequestCtrl', function($scope, CurrentRequest, DirectVideoUrl, $sce) {
  $scope.request = CurrentRequest.get();
  DirectVideoUrl.getDirectUrl($scope.request.url).success(function(data) {
    console.log(data);
    $scope.request.directUrl = $sce.trustAsResourceUrl(data.direct_url);
    $scope.setVideo();
  });
  $scope.setVideo = function() {
    var sourceElement = angular.element(document.querySelector('videogular video'));
    sourceElement[0].src = $scope.request.directUrl;
    sourceElement[0].type = 'video/mp4';
  };
  $scope.onPlayerReady = function(API) {
    $scope.API = API;
    API.play();
  };
  $scope.onCompleteVideo = function() {
    console.log('done');
  };
})

.controller('PlayerCtrl', function($scope, $stateParams) {
  $scope.partyId = $stateParams.partyId;
})
