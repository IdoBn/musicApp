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
  }
  $scope.createRequest = function(song) {
    Party.createRequest(song, $scope.id).success(function(data, status) {
      var backView = $ionicViewService.getBackView();
      backView && backView.go();
    })
  }
})
