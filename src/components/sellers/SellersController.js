"use strict";

angular.module("project3App").controller("SellersController", ["$scope", "AppResource", function SellersController($scope, AppResource) {
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

	AppResource.getSellers().success(function (data) {
		$scope.listOfSellers = data;
	}).error(function (errorData) {
		$scope.loadingListError = true;
	});
}]);