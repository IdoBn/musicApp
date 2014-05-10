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
