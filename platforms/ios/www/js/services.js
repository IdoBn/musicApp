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
        }
    }
});