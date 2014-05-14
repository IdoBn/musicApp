var services = angular.module('starter.services', []);

services.factory('Party', function($http) {
  function load(path) {
    return $http.get('http://music-hasalon.herokuapp.com/' + path + '.json');
  }
  return {
    getParties: function() {
      return load('party');
    },
    getParty: function(id) {
      return load('party/' + id);
    },
    search: function(id, songpull) {
      return $http({
        url: 'http://music-hasalon.herokuapp.com/party/' + id + '/search.json',
        method: 'GET',
        params: {
          songpull: songpull
        }
      });
    },
    createRequest: function(song, partyId) {
      return $http({
        url: 'http://music-hasalon.herokuapp.com/requests',
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
        url: 'http://music-hasalon.herokuapp.com/request_played',
        method: 'POST',
        data: {
          id: id
        }
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