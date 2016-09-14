angular.module('notesweb')
	.controller('HomeController', ['$scope','ProgrammingService', function($scope,ProgrammingService) {
		'use strict';

		var self = this;
		self.hello = 'hello';

		angular.extend($scope,{
			nowPlaying: {},
			notifications: [],
			spinner: false,
		});

		ProgrammingService.now().then(function(data){
			if(data!==false){
				$scope.notifications.push({type: 'notification','text':'Oh no commercials 😫, need an awesome app or website? Visite www.matise.nl or give us a call on +31 (0) 20 845 3799!'});
			}else{
				$scope.nowPlaying = data;
			}
		},function(error){

		});

		setTimeout(function(){
			$scope.notifications.push({type: 'notification','text':'Oh no commercials 😫, need an awesome app or website? Visite www.matise.nl or give us a call on +31 (0) 20 845 3799!'});
			$scope.$applyAsync();
			// console.log($scope.notifications);
		},8000);

		setTimeout(function(){
			$scope.spinner = true;
			$scope.$applyAsync();
		},5000);

	}]);
