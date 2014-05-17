angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, OpenFB, AuthUser, $rootScope) {
  $scope.logout = function () {
    OpenFB.logout();
    $state.go('app.login');
  };

  $scope.revokePermissions = function () {
    OpenFB.revokePermissions().then(
    function () {
      $state.go('app.login');
    },
    function () {
      alert('Revoke permissions failed');
    });
  };

  $rootScope.$on('CURRENT_USER_SET', function() {
    $scope.user = AuthUser.getCurrentUser();
    console.log($scope.user);
  });
})

.controller('PartiesCtrl', function($scope, Party) {
  Party.getParties().success(function(data) {
    console.log('new party: ', data);
    $scope.parties = data;
  });
})

.controller('LoginCtrl', function ($scope, $location, OpenFB) {
  $scope.facebookLogin = function () {
    OpenFB.login('email,read_stream').then(
      function () {
        $location.path('/app/person/me/feed');
      },
      function () {
        alert('OpenFB login failed');
      });
  };
})

.controller('PartyCtrl', function($scope, $stateParams, Party, $rootScope, AuthUser) {
  $scope.id = $stateParams.partyId;
  $scope.currentUser = AuthUser.getCurrentUser();
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

  $rootScope.$broadcast('destroyInterval');
})

.controller('NewParty', function($scope, Party, $state) {
  $scope.createParty = function(party) {
    Party.createParty(party).success(function(data) {
      $state.go('app.parties');
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

.controller('PlayerCtrl', function($scope, $stateParams , $sce, $rootScope, $interval, Party, DirectVideoUrl) {
  $scope.partyId = $stateParams.partyId;

  $scope.config = {
    width: 740,
    height: 380,
    autoHide: false,
    autoHideTime: 3000,
    autoPlay: false,
    responsive: false,
    transclude: true,
    theme: 'lib/bower_components/videogular-themes-default/videogular.css'
  };

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
})
