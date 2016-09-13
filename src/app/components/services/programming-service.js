angular.module('notesweb')
	.service('ProgrammingService', ['$q','$http', function($q,$http) {
		'use strict';

		var self = this;

		self.now = function now() {
      var deferObj = $q.defer();
      
      $http.get('http://api.notes.matise.nl/programming/now').then(function(data){
        deferObj.resolve(data);
      },function(error){
        deferObj.reject(error);
      });

      return deferObj.promise;
		};

	}]);
