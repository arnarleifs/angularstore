"use strict";

angular.module("project3App").controller("ProductTabController", ["$rootScope", "$scope", "AppResource", function ($rootScope, $scope, AppResource) {
	$scope.productList = [];

	AppResource.getSellerProducts(parseInt($scope.sellerId)).success(function (products) {
		$scope.productList = products;
	}).error(function () {
		console.log("error");
	});

	$rootScope.$on('addToProductList', function (data, product) {
		AppResource.addSellerProduct(parseInt($scope.sellerId), product).success(function (product) {
			console.log(product);
		}).error(function () {
			console.log("error");
		});
	});
}]);
