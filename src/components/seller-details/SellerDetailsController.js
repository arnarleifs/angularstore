"use strict";

angular.module("project3App").controller("SellerDetailsController", [ "$rootScope", "$scope", "$routeParams", "AppResource", "$location","$mdToast", "$mdDialog", function ($rootScope, $scope, $routeParams, AppResource, $location, $mdToast, $mdDialog){

	$scope.seller = { };
	$scope.sellerId = $routeParams.id;

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

	AppResource.getSellerDetails(parseInt($routeParams.id)).success(function (sellerInfo){
		$scope.seller = sellerInfo;
	}).error(function() {	
		$location.path("/");
		$mdToast.show({
			templateUrl: 'components/toasts/failed_to_find_seller_details.html',
			hideDelay: 3000,
			position:'center'
		});
	});

}]);
