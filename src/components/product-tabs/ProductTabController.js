"use strict";

angular.module("project3App").controller("ProductTabController", ["$rootScope", "$scope", "AppResource", "$mdDialog", "$mdToast", function ($rootScope, $scope, AppResource, $mdDialog, $mdToast) {
	$scope.productList = [];
	$scope.error = false;

	$scope.editProduct = function editProduct(evt, product) {
		$mdDialog.show({
			controller: "ProductDialogController",
			templateUrl: "components/product-dlg/product-edit-dlg.html",
			parent: angular.element(document.body),
			targetEvent: evt,
			clickOutsideToClose: true,
			escapeToClose: true,
			locals: {
				product: product
			}
		});
	};

	AppResource.getSellerProducts(parseInt($scope.sellerId)).success(function (products) {
		$scope.productList = products;
	}).error(function () {
		$scope.error = true;
	});

	$rootScope.$on('addToProductList', function (data, product) {
		AppResource.addSellerProduct(parseInt($scope.sellerId), product).success(function (product) {
			// Show toast
			$mdToast.show({
				templateUrl: 'components/toasts/add_product_success_toast.html',
				parent: angular.element(document.body),
				hideDelay: 3000,
				position: 'center'
			});
			$scope.productList.push(product);
		}).error(function () {
			$scope.error = true;
			$mdToast.show({
				templateUrl: 'components/toasts/add_product_failed_toast.html',
				parent: angular.element(document.body),
				hideDelay: 3000,
				position: 'center'
			});
		});
	});

	$rootScope.$on('editProduct', function (data, product) {
		AppResource.updateSellerProduct(parseInt($scope.sellerId), product).success(function (product) {
			$mdToast.show({
				templateUrl: 'components/toasts/edit_product_success_toast.html',
				parent: angular.element(document.body),
				hideDelay: 3000,
				position: 'center'
			});
		}).error(function () {
			$scope.error = true;
			$mdToast.show({
				templateUrl: 'components/toasts/edit_product_failed_toast.html',
				parent: angular.element(document.body),
				hideDelay: 3000,
				position: 'center'
			});
		});
	});

	// To unsubscribe the $rootScope.$on subscribers
	$scope.$on('$destroy', function () {
		$rootScope.$$listeners['addToProductList'] = [];
		$rootScope.$$listeners['editProduct'] = [];
	});
}]);
