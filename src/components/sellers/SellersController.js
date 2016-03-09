"use strict";

angular.module("project3App").controller("SellersController", ["$scope", "AppResource", "$mdDialog", function SellersController($scope, AppResource, $mdDialog) {
	// default sorting type for the seller table
	$scope.sortType = 'name';
	// default sort order
	$scope.sortReverse = false;
	// Default search string
	$scope.searchWord = "";
	// The initial seller list
	$scope.listOfSellers = [];
	// Error message if there was an error retrieving the list of sellers
	$scope.loadingListError = false;
	// Emit message to the approriate controller once the user wants to open the dialog
	$scope.openDialog = function openDialog(evt) {
		$mdDialog.show({
			controller: "SellerDialogController",
			templateUrl: "components/seller-dlg/seller-dlg.html",
			parent: angular.element(document.body),
			targetEvent: evt,
			clickOutsideToClose: true,
			escapeToClose: true
		});
	};

	// Initialize the list of sellers
	AppResource.getSellers().success(function (data) {
		$scope.listOfSellers = data;
	}).error(function (errorData) {
		$scope.loadingListError = true;
	});
}]);