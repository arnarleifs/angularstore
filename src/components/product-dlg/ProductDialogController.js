"use strict";

angular.module("project3App").controller("ProductDialogController", ["$rootScope", "$scope", "$mdDialog", "AppResource", "product", function ($rootScope, $scope, $mdDialog, AppResource, product) {
	$scope.product = {
		id: 0,
		name: "",
		price: 0,
		quantitySold: 0,
		quantityInStock: 0,
		imagePath: ""
	};

	if (product !== undefined) {
		$scope.product = {
			id: product.id,
			name: product.name,
			price: product.price,
			quantitySold: product.quantitySold,
			quantityInStock: product.quantityInStock,
			imagePath: product.imagePath
		};
	}

	// Closes the dialog for submitting data for new product
	$scope.close = function close() {
		$mdDialog.cancel();
	};
	// Adds the product linked to this specific user
	$scope.addProduct = function addProduct(product) {
		$rootScope.$emit('addToProductList', product);
		$mdDialog.cancel();
	};
	// Edits the selected product
	$scope.editProduct = function editProduct(product) {
		$rootScope.$emit('editProduct', product);
		$mdDialog.cancel();
	};
}]);