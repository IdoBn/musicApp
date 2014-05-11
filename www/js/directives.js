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
})

