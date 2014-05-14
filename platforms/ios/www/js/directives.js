var directives = angular.module('starter.directives', []);

directives.directive('songItem', function(CurrentRequest) {
  return {
    restrict: 'E',
    controller: function($scope) {
      $scope.clicked = function(request) {
        CurrentRequest.set(request);
      };
    },
    scope: {
      request: '='
    },
    templateUrl: 'templates/directives/songItem.html',
    replace: true
  }
});

directives.directive('hasalonPlayer', function(Party, DirectVideoUrl) {
  return {
    restrict: 'E',
    replace: true,   
    controller: function($scope, $sce, $rootScope, $interval) {
      Party.getParty($scope.partyId).success(function(data) {
        $scope.party = data.party;
        console.log('new request: '+$scope.party);
        $scope.request = $scope.party.requests[0];
        $scope.getNewDirectUrl();
      });

      var intervalPromise = $interval(function() {
        $scope.getNewParty();
        console.log('interval');
      }, 5000);

      $scope.getNewParty = function() {
        Party.getParty($scope.partyId).success(function(data) {
          $scope.party = data.party;
          if (!$scope.request || $scope.request.id != $scope.party.requests[0].id) {
            console.log('new request: '+$scope.party);
            $scope.request = $scope.party.requests[0];
            $scope.getNewDirectUrl();
          }
        });
      };

      $scope.getNewDirectUrl = function() {
        DirectVideoUrl.getDirectUrl($scope.request.url).success(function(data) {
          console.log(data);
          $scope.request.directUrl = $sce.trustAsResourceUrl(data.direct_url);
          $scope.setVideo();
        });
      };

      $scope.setVideo = function() {
        var sourceElement = angular.element(document.querySelector('videogular video'));
        sourceElement[0].src = $scope.request.directUrl;
        sourceElement[0].type = 'video/mp4';
      };

      $scope.onPlayerReady = function(API) {
        $scope.API = API;
        API.play();
      };

      $rootScope.$on('onVgComplete', function() {
        console.log('complete!!!');
        Party.setPlayed($scope.request.id).success(function(data){
          $scope.getNewParty();
        });
      });

      $rootScope.$on('destroyInterval', function(){
        console.log('destroy interval');
        $scope.$destroy();
        $interval.cancel(intervalPromise);
      });
    },
    scope: {
      partyId: '='
    },
    templateUrl: 'templates/directives/hasalonPlayer.html',
    link: function(scope,element,attrs){

    }
  }
});

