/* global Pusher */
angular.module('notesweb')
	.service('SendPusherService', ['$http', function ($http) {
    'use strict';

    var self = this;

    self.newSong = function newSong(artist,track,karaoke){
      if(karaoke===true){
        karaoke = 'yes';
      }else{
        karaoke = 'no';
      }
      $http.get('http://api.notes.matise.nl/pusherer/newsong',
        {params: {artist: artist, track:track,karaoke:karaoke} });
    };

}]);
