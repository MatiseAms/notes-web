angular.module('notesweb')
	.controller('HomeController', ['$scope',function($scope) {
		'use strict';

		var self = this;
		self.hello = 'hello';

		$scope.spinner = false;
    setTimeout(function(){
      $scope.spinner = true;
      $scope.$apply();
    },1000);

	}]);
