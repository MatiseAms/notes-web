angular.module('notesweb')
	.controller('HomeController', ['$scope','ProgrammingService', function($scope,ProgrammingService) {
		'use strict';

		var self = this;
		self.hello = 'hello';

		angular.extend($scope,{
			nowPlaying: {}
		});

		ProgrammingService.now().then(function(data){
			$scope.nowPlaying = data;
		},function(error){

		});

		$scope.spinner = false;
    setTimeout(function(){
      $scope.spinner = true;
      $scope.$apply();
    },1000);

	}]);
