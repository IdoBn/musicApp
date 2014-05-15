var services = angular.module('starter.services', []);

// var URL = 'http://music-hasalon.herokuapp.com';
var URL = 'http://localhost:3000'

services.factory('Party', function($http) {
  function load(path) {
    return $http.get(URL + '/' + path);
  }
  return {
    getParties: function() {
      return load('parties');
    },
    getParty: function(id) {
      return load('parties/' + id);
    },
    search: function(id, songpull) {
      return $http({
        url: URL + '/parties/' + id + '/search',
        method: 'GET',
        params: {
          songpull: songpull
        }
      });
    },
    createRequest: function(song, partyId) {
      return $http({
        url: URL + '/requests',
        method: 'POST',
        data: {
          request: {
            title: song.title,
            author: song.author.name,
            url: song.player_url,
            party_id: partyId,
            thumbnail: song.thumbnails[0].url
          }
        }
      });
    },
    setPlayed: function(id) {
      return $http({
        url: URL + '/requests/'+ id +'/played',
        method: 'PATCH'
      })
    } 
  }
});

services.factory('CurrentRequest', function() {
  var request = null;
  return {
    get: function() {
      return request;
    },
    set: function(newRequest) {
      request = newRequest;
    }
  }
});

services.factory('DirectVideoUrl', function($http) {
  var url = 'http://ec2-54-85-146-44.compute-1.amazonaws.com:8989/api/info?url=';
  return {
    getDirectUrl: function(ytUrl) {
      var newYtUrl = ytUrl.split('&feature=')[0];
      return $http.get(url+newYtUrl);
    }
  }
});