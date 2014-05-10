angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope, Playlists) {
    $scope.playlists2 = Playlists.all();

    Playlists.getParties().success(function(data) {
        $scope.parties = data.party;
    });
})

.controller('PlaylistCtrl', function($scope, $stateParams, Playlists) {
    $scope.id = $stateParams.playlistId;
    Playlists.getParty($scope.id).success(function(data) {
        $scope.party = data.party;
    });

    $scope.doRefresh = function() {
        Playlists.getParty($scope.id).success(function(data) {
            $scope.party = data.party;
        })
        .finally(function() {
           $scope.$broadcast('scroll.refreshComplete');
         });
    };
})
