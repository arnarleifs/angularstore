"use strict";

angular.module("project3App").controller("SellerDetailsController", ["$rootScope", "$scope", "$routeParams", "AppResource", "$mdDialog", function ($rootScope, $scope, $routeParams, AppResource, $mdDialog){

	$scope.seller = {};
	$scope.errorMessage = "";
	// Opens up the dialog to add a new product
	$scope.openDialog = function openDialog(evt) {
		$mdDialog.show({
			controller: "ProductDialogController",
			templateUrl: "components/product-dlg/product-dlg.html",
			parent: angular.element(document.body),
			targetEvent: evt,
			clickOutsideToClose: true,
			escapeToClose: true
		});
	};

	$rootScope.$on('addToProductList', function (data, product) {
		AppResource.addSellerProduct($scope.seller["id"], product).success(function (product) {
			console.log(product);
		}).error(function () {

		});
	});

	AppResource.getSellerDetails(parseInt($routeParams.id)).success(function (sellerInfo){
		$scope.seller = sellerInfo;
	}).error(function() {
		$scope.errorMessage = "An error occurred while retreiving the details about this seller....please try again later";
	});
}]);