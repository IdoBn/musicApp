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

directives.directive('noDrag', function($ionicGesture) { 
  return {
    link: function(scope, element, attr) {
      $ionicGesture.on('dragleft', function(e) {
        e.gesture.srcEvent.preventDefault();
      }, element);

      $ionicGesture.on('dragright', function(e) {
        e.gesture.srcEvent.preventDefault();
      }, element);
    }
  }
});


