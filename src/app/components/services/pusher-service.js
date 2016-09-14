/* global Pusher */
angular.module('notesweb')
	.service('PusherService', [function () {
    'use strict';

    // Init Pusher
    var pusher = new Pusher('e28b6f53404860a0e3bd', { cluster: 'eu', encrypted: true });
    var channel = pusher.subscribe('game');


    return channel;
}]);
