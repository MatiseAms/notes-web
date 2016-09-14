angular.module('notesweb')
	.controller('HomeController', ['$scope','$timeout','ProgrammingService','PusherService', function($scope,$timeout,ProgrammingService,PusherService) {
		'use strict';

		var self = this;

		self.displaySpinner = function displaySpinner(delay,show){
			$timeout(function(){
				$scope.spinning = show;
				$scope.$applyAsync();
			},delay);
		};
		self.checkSong  = function checkSong(){
			self.displaySpinner(0,true);
			ProgrammingService.now().then(function(data){
				if(data.error){
					if(!$scope.lastMessageCommercial){
						$scope.notifications.unshift({type: 'notification','text':'Oh no commercials :(, need an awesome app or website? Visit www.matise.nl!'});
						$scope.lastMessageCommercial = true;
						$timeout(function(){self.checkSong();},500);
					}
				}else{
					if($scope.nowPlaying!==data){
						$scope.notifications.unshift({type: 'notification','text':'Found a song, open your app to start the fun'});
						self.displaySpinner(1000,false);
						$scope.lastMessageCommercial = false;
						$scope.nowPlaying = data;

						// check at the end of the song
						var songTimeout = (data.data[6]*1000)-2000;
						console.log('checking song in '+data.data[6]+' sec, '+songTimeout+ 'ms');
						// $timeout(function(){
						// 	self.checkSong();
						// },songTimeout);

						// send push to phone

					}

				}
			},function(error){
				$scope.notifications.unshift({type: 'notification','text':'Oops something went wrong, I will try again in a few seconds'});
				self.displaySpinner(1000,false);
			});
		};

		angular.extend($scope,{
			nowPlaying: {},
			notifications: [],
			lastMessageCommercial: false,
			spinning: false,
			microfonePopped: false,
			showIntro: true,
			karaokeMode: false
		});

		$timeout(function(){
			$scope.showIntro = false;
			$scope.$applyAsync();
		},3000);

		$timeout(function(){
			$scope.microfonePopped = true;
			$scope.notifications.unshift({type: 'notification','text':'Hi there, I\'m listening!'});
			$scope.$applyAsync();
		},5000);
		self.displaySpinner(5500,true);

		$timeout(function(){
			self.checkSong();
		},10000);

		PusherService.bind('karaoke', function(data) {
			console.log('karaoke time');
			$scope.karaokeMode = true;
			$scope.$applyAsync();
    });

		PusherService.bind('score', function(data) {
			console.log('score');
			$scope.notifications.unshift({type: 'userScore',score: data.score, total: data.total, profilepicture: data.profilepicture});
			$scope.$applyAsync();
    });


	}]);
