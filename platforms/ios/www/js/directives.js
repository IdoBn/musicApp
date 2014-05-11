var directives = angular.module('starter.directives', []);

directives.directive('songItem', function() {
  return {
    restrict: 'E',
    controller: function($scope) {

    },
    scope: {
      request: '='
    },
    templateUrl: 'templates/directives/songItem.html',
    replace: true,
    link: function(scope, element, attrs) {
      
    }
  }
})

