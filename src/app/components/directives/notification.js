angular.module('notesweb')
	.directive('notification', function() {
		return {
			restrict: 'E',
			templateUrl: 'components/directives/notification.html',
			scope: {
				item: '='
			},
			link: function($scope, $elem, $attr) {
				// console.log($scope); //the data is correclty printed
			}
		};
	}).controller('notifactionDirectiveController', ['$scope', function($scope) {

	}]);
