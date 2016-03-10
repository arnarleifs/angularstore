"use strict";

angular.module("project3App").controller("SellerDetailsController", [ "$scope", "$routeParams", "AppResource", "$location","$mdToast", function ($scope, $routeParams, AppResource, $location, $mdToast){

	$scope.seller = { };

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
		console.log($scope.errorMessage);
	});
}]);