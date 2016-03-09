"use strict";

angular.module("project3App").controller("MainController", ["$rootScope", "$scope", "$translate", function ($rootScope, $scope, $translate) {
	$scope.changeLanguage = function changeLanguage(selection) {
		$translate.use(selection);
	};
}]);