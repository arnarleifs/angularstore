"use strict";

angular.module("project3App").controller("SellerDialogController", ["$rootScope", "$scope", "$mdDialog", function ($rootScope, $scope, $mdDialog) {
	$scope.seller = {
		name: "",
		category: "",
		imagePath: ""
	};
	$scope.categoryList = [
		"Fatnaður",
		"Keramik",
		"Skartgripir",
		"Matvörur",
		"Leikföng",
		"Kvikmyndir",
		"List",
		"Snyrtivörur",
		"Heilsuvörur"
	];
	// Closes the dialog
	$scope.close = function () {
		$mdDialog.cancel();
	};
	// Sends a request to SellerController to add to it's current list of sellers
	$scope.addSeller = function addSeller(newSeller) {
		// If form is valid
		$rootScope.$emit('addToSellerList', newSeller);
		$mdDialog.cancel();
	};
}]);