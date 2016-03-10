"use strict";

angular.module("project3App").controller("ProductDialogController", ["$rootScope", "$scope", "$mdDialog", "AppResource", function ($rootScope, $scope, $mdDialog, AppResource) {
	$scope.product = {
		id: 0,
		name: "",
		price: 0,
		quantitySold: 0,
		quantityInStock: 0,
		imagePath: ""
	};
	// Closes the dialog for submitting data for new product
	$scope.close = function close() {
		$mdDialog.cancel();
	};
	// Adds the product linked to this specific user
	$scope.addProduct = function addProduct(product) {
		$rootScope.$emit('addToProductList', product);
		$mdDialog.cancel();
	};
}]);