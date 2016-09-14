angular.module('notesweb')
	.directive('notification', function() {
		return {
			restrict: 'E',
			templateUrl: 'components/directives/notification.html',
			scope: {
        notification: '@',
				item: '='
			},
			link: function($scope, $elem, $attr) {
				console.log($scope.nr); //the data is correclty printed
			}
		};
	}).controller('notifactionDirectiveController', ['$scope', function($scope) {

	}]);
