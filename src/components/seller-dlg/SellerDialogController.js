"use strict";

angular.module("project3App").controller("SellerDialogController", ["$rootScope", "$scope", "$mdDialog", "seller", function ($rootScope, $scope, $mdDialog, seller) {
	$scope.seller = {
		name: "",
		category: "",
		imagePath: ""
	};

	// If the user is being edited
	if (seller !== undefined) {
		$scope.seller = {
			id: seller.id,
			name: seller.name,
			category: seller.category,
			imagePath: seller.imagePath
		};
	}

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
	$scope.close = function cancel() {
		$mdDialog.cancel();
	};
	// Sends a request to SellerController to add to it's current list of sellers
	$scope.addSeller = function addSeller(newSeller) {
		// If form is valid
		$rootScope.$emit('addToSellerList', newSeller);
		$mdDialog.cancel();
	};
	// Sends a request to SellerController to edit the selected seller
	$scope.editSeller = function editSeller(newSeller) {
		$rootScope.$emit('editSeller', newSeller);
		$mdDialog.cancel();
	};
}]);