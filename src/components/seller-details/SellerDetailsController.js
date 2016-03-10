"use strict";

angular.module("project3App").controller("SellerDetailsController", [ "$scope", "$routeParams", "AppResource", function ($scope, $routeParams, AppResource){

	$scope.seller = { };
	$scope.errorMessage = "";

	AppResource.getSellerDetails(parseInt($routeParams.id)).success(function (sellerInfo){
		$scope.seller = sellerInfo;
		console.log(sellerInfo);
	}).error(function() {
		$scope.errorMessage = "An error occurred while retreiving the details about this seller....please try again later";
		console.log($scope.errorMessage);
	});
}]);