"use strict";

angular.module("project3App").controller("SellerDialogController", ["$rootScope", "$scope", "$mdDialog", function ($rootScope, $scope, $mdDialog) {
	$scope.close = function () {
		$mdDialog.cancel();
	};
}]);