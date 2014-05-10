var services = angular.module('starter.services', []);

services.factory('Playlists', function($http) {
    function load(path) {
        return $http.get('http://music-hasalon.herokuapp.com/' + path + '.json');
    }

    return {
        all: function() {
            return [
                { title: 'Reggae', id: 1 },
                { title: 'Chill', id: 2 },
                { title: 'Dubstep', id: 3 },
                { title: 'Indie', id: 4 },
                { title: 'Rap', id: 5 },
                { title: 'Cowbell', id: 6 }
            ]
        },

        getParties: function() {
            return load('party');
        },

        getParty: function(id) {
            return load('party/' + id);
        }
    }
});