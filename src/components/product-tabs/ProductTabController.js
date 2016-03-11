"use strict";

angular.module("project3App").controller("ProductTabController", ["$rootScope", "$scope", "AppResource", function ($rootScope, $scope, AppResource) {
	$scope.productList =[];
	
	AppResource.getSellerProducts($scope.sellerId).success( function (products){
		$scope.productList = products;
	}).error (function (){
		console.log("error");
	});
}]);
