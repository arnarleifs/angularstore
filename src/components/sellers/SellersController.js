"use strict";

angular.module("project3App").controller("SellersController", ["$rootScope", "$scope", "$location", "AppResource", "$mdDialog", "$mdToast", function SellersController($rootScope, $scope, $location, AppResource, $mdDialog, $mdToast) {
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
			escapeToClose: true,
			locals: {
				seller: undefined
			}
		});
	};
	// Routes to the detail site of the selected seller
	$scope.getSellerDetail = function getSellerDetail(id) {
		$location.path("/seller-details/" + id);
	};
	// Opens a dialog for editing the selected user
	$scope.editSeller = function editSeller(evt, seller) {
		$mdDialog.show({
			controller: "SellerDialogController",
			templateUrl: "components/seller-dlg/seller-edit-dlg.html",
			parent: angular.element(document.body),
			target: evt,
			clickOutsideToClose: true,
			escapeToClose: true,
			locals: {
				seller: seller
			}
		});
	};

	// Listen for new added sellers through the dialog (SellerDialogController)
	$rootScope.$on('addToSellerList', function (data, newSeller) {
		AppResource.addSeller(newSeller).success(function (seller) {
			$mdToast.show({
				templateUrl: 'components/toasts/add_success_toast.html',
				parent: angular.element(document.body),
				hideDelay: 3000,
				position: 'center'
			});
		}).error(function (errorData) {
			// Show appropriate error message
			$mdToast.show({
				templateUrl: 'components/toasts/add_failed_toast.html',
				parent: angular.element(document.body),
				hideDelay: 3000,
				position: 'center'
			});
		});
	});

	// Listen for new edited seller through the dialog (SellerEditController)
	$rootScope.$on('editSeller', function (data, newSeller) {
		AppResource.updateSeller(newSeller.id, newSeller).success(function (seller) {
			// Show success toast
			$mdToast.show({
				templateUrl: 'components/toasts/edit_success_toast.html',
				parent: angular.element(document.body),
				hideDelay: 3000,
				position: 'center'
			});
		}).error(function () {
			// Show error toast
			$mdToast.show({
				templateUrl: 'components/toasts/edit_failed_toast.html',
				parent: angular.element(document.body),
				hideDelay: 3000,
				position: 'center'	
			});
		});
	});

	// To unsubscribe the $rootScope.$on subscribers
	$scope.$on('$destroy', function () {
		$rootScope.$$listeners['addToSellerList'] = [];
		$rootScope.$$listeners['editSeller'] = [];
	});

	// Initialize the list of sellers
	AppResource.getSellers().success(function (data) {
		$scope.listOfSellers = data;
	}).error(function (errorData) {
		$scope.loadingListError = true;
	});
}]);