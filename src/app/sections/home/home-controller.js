angular.module('notesweb')
	.controller('HomeController', ['$scope','$timeout','$interval','ProgrammingService','PusherService', function($scope,$timeout,$interval,ProgrammingService,PusherService) {
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

						console.log($scope.nowPlaying);
						if($scope.nowPlaying[10]){
							console.log($scope.nowPlaying[10].lyrics.lyrics_body);
						}

						$timeout(function(){
							$scope.notifications.unshift({type: 'notification','text':'Found a song, open your app to start the fun!'});
							self.displaySpinner(1000,false);

							// send push to phone

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
			karaokeMode: false
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
			$scope.karaokeMode = true;
			$scope.$applyAsync();
    });

		PusherService.bind('score', function(data) {
			console.log('score');
			$scope.notifications.unshift({type: 'userScore',score: data.score, total: data.total, profilepicture: data.profilepicture});
			$scope.$applyAsync();
    });

    self.lyrics = function(){
      var linesTotal = $('ul.lyrics').find('li').length;
      var lineTime = 2000;
      var i = 0;
      var pushLine = function () {
        i++;
        $('ul.lyrics').attr('data-line',i);
        $('ul.lyrics li').removeClass('active');
        $('ul.lyrics li').eq(i).addClass('active');
        if(i > linesTotal){
          $interval.cancel();
        }
      };
      $interval(pushLine, lineTime);
    };
    setTimeout(function(){
      self.lyrics();
    },3000);


	}]);
