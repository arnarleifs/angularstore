"use strict";

angular.module("project3App").controller("SellerDetailsController", [ "$rootScope", "$scope", "$routeParams", "AppResource", "$location","$mdToast", "$mdDialog", function ($rootScope, $scope, $routeParams, AppResource, $location, $mdToast, $mdDialog){

	$scope.seller = { };

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
		console.log(sellerInfo);
	}).error(function() {	
		$location.path("/");
		$mdToast.show({
			templateUrl: 'components/toasts/failed_to_find_seller_details.html',
			hideDelay: 3000,
			position:'center'
		});
	});
}]);
