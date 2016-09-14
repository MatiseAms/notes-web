angular.module('notesweb')
	.controller('HomeController', ['$scope','$timeout','ProgrammingService','PusherService','SendPusherService', function($scope,$timeout,ProgrammingService,PusherService,SendPusherService) {
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
			console.log('checking for a song');
			ProgrammingService.now().then(function(data){
				if(data.data.error){
					if(!$scope.lastMessageCommercial){
						$scope.notifications.unshift({type: 'notification','text':'Oh no commercials :( need an awesome app or website? Visit www.matise.nl!'});
						$scope.lastMessageCommercial = true;
					}
					$timeout(function(){self.checkSong();},500);
				}else{
					if($scope.nowPlaying!==data.data){
						$scope.lastMessageCommercial = false;
						$scope.nowPlaying = data.data;

						$timeout(function(){
							$scope.notifications.unshift({type: 'notification','text':'Found a song, open your app to start the fun!'});
							self.displaySpinner(1000,false);

							var hasKaraoke = false;
							if($scope.nowPlaying[10]&&$scope.nowPlaying[10].lyrics.lyrics_body){
								hasKaraoke = true;
								$scope.lyriclines = $scope.nowPlaying[10].lyrics.lyrics_lines;
							}
							// send push to phone
							SendPusherService.newSong($scope.nowPlaying[7],$scope.nowPlaying[8],hasKaraoke);
						},5000);
						// check at the end of the song
						var songTimeout = data.data[6]*1000;
						console.log('checking song in '+data.data[6]+' sec, '+songTimeout+ 'ms');
						if(songTimeout<0){
							self.checkSong();
						}else{
							self.displaySpinner(songTimeout-2000,true);
							$timeout(function(){
								$scope.karaokeMode = false;
								$scope.$applyAsync();
								self.checkSong();
							},songTimeout+2000);
						}
					}else{
						$timeout(function(){
							self.checkSong();
						},1000);
					}

				}
			},function(error){
				$scope.notifications.unshift({type: 'notification','text':'Oops something went wrong, I will try again in a few seconds!'});
				$timeout(function(){
					self.checkSong();
				},1500);
			});
		};

		angular.extend($scope,{
			nowPlaying: {},
			notifications: [],
			lastMessageCommercial: false,
			spinning: false,
			microfonePopped: false,
			showIntro: true,
			karaokeMode: false,
			lyriclines: [],
			player: {
			 	name: '',
				avatar: ''
			}
		});

		$timeout(function(){
			$scope.showIntro = false;
			$scope.$applyAsync();
		},6000);

		$timeout(function(){
			$scope.microfonePopped = true;
			$scope.notifications.unshift({type: 'notification','text':'Hi there, I\'m listening!'});
			$scope.$applyAsync();
		},7000);
		self.displaySpinner(7500,true);

		$timeout(function(){
			self.checkSong();
		},10000);

		PusherService.bind('karaoke', function(data) {
			console.log('karaoke time');
			$scope.player.name = data.name;
			$scope.player.avatar = data.profilepicture;
			$scope.karaokeMode = true;
			$scope.$applyAsync();
    });

		PusherService.bind('score', function(data) {
			$scope.notifications.unshift({type: 'userScore',score: data.score, total: data.total, profilepicture: data.profilepicture});
			$scope.$applyAsync();
    });


	}]);
