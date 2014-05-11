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
    }
    
  }
});