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
			spinning: false,
			microfonePopped: false,
			showIntro:  true
		});

		$timeout(function(){
			$scope.showIntro = false;
			$scope.$applyAsync();
		},2000);

		$timeout(function(){
			$scope.microfonePopped = true;
			$scope.notifications.unshift({type: 'notification','text':'Hi there, I\'m listening!'});
			$scope.$applyAsync();
		},4000);
		self.displaySpinner(4500,true);

		$timeout(function(){
			ProgrammingService.now().then(function(data){
				if(data!==false){
					$scope.notifications.unshift({type: 'notification','text':'Oh no commercials :(, need an awesome app or website? Visite www.matise.nl or give us a call on +31 (0) 20 845 3799!'});
					self.displaySpinner(1000,false);
				}else{
					$scope.nowPlaying = data;
				}
			},function(error){
				$scope.notifications.unshift({type: 'notification','text':'Oops something went wrong with the service, trying again in a few seconds'});
				self.displaySpinner(1000,false);
			});
		},10000);



	}]);
