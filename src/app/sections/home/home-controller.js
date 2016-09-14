angular.module('notesweb')
	.controller('HomeController', ['$scope','$timeout','ProgrammingService', function($scope,$timeout,ProgrammingService) {
		'use strict';

		var self = this;

		self.displaySpinner = function displaySpinner(delay,show){
			$timeout(function(){
				$scope.spinning = show;
				$scope.$applyAsync();
			},delay);
		};

		angular.extend($scope,{
			nowPlaying: {},
			notifications: [],
			lastMessageCommercial: false,
			spinning: false,
			microfonePopped: false,
			showIntro:  true,
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
			ProgrammingService.now().then(function(data){
				if(data!==false){
					if(!$scope.lastMessageCommercial){
						$scope.notifications.unshift({type: 'notification','text':'Oh no commercials :(, need an awesome app or website? Visit www.matise.nl!'});
						$scope.lastMessageCommercial = true;
					}
				}else{
					$scope.notifications.unshift({type: 'notification','text':''});
					self.displaySpinner(1000,false);
					$scope.lastMessageCommercial = false;
					$scope.nowPlaying = data;
				}
			},function(error){
				$scope.notifications.unshift({type: 'notification','text':'Oops something went wrong, I will try again in a few seconds'});
				self.displaySpinner(1000,false);
			});
		},10000);



	}]);
