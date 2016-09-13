angular.module('notesweb')
	.controller('HomeController', ['$scope','ProgrammingService', function($scope,ProgrammingService) {
		'use strict';

		var self = this;
		self.hello = 'hello';

		ProgrammingService.now();

		$scope.spinner = false;
    setTimeout(function(){
      $scope.spinner = true;
      $scope.$apply();
    },1000);

	}]);
