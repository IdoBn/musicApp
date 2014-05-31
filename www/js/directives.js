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

directives.directive('likeButton', function(Party, AuthUser, CurrentRequest, $rootScope) {
  return {
    restrict: 'E',
    link: function(scope, elem, attr) {
        scope.currentUser = AuthUser.getCurrentUser();
        scope.request = CurrentRequest.get();

        function checkAlreadyLiked() {
          var ret = false;
          scope.request.likes.forEach(function(like) {
            if (like.user.id == scope.currentUser.id) {
              console.log('user has like!' ,like)
              ret = true;
            }
          });
          return ret;
        }

        scope.alreadyLiked = checkAlreadyLiked();

        scope.like = function(id) {
          console.log('like pressed!');
          Party.likeRequest(id).success(function(data) {
            console.log('like request', data);
            scope.request = data.request;
            scope.alreadyLiked = checkAlreadyLiked();
            CurrentRequest.set(scope.request);
            $rootScope.$broadcast('request-updated');
          });
        };

        scope.unlike = function(id) {
          console.log('unlike pressed!');
          Party.unlikeRequest(id).success(function(data) {
            console.log('unlike request', data);
            scope.request = data.request;
            scope.alreadyLiked = checkAlreadyLiked();
            CurrentRequest.set(scope.request);
            $rootScope.$broadcast('request-updated');
          });
        };

        scope.clicked = function() {
          console.log('clicked!');
          console.log('current user', scope.currentUser);
          console.log('current request', scope.request);
          if (scope.alreadyLiked) {
            scope.unlike(scope.request.id);
          } else {
            scope.like(scope.request.id);
          }
        };
    },
    scope: {
      likeId: '=',
      requestId: '='
    },
    templateUrl: 'templates/directives/likeButton.html',
    replace: true
  }
});

