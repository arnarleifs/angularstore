"use strict";

describe("ProductDialogController", function () {
	beforeEach(module("project3App"));

	var ProductDialogController, scope;

	var mockDialog = {
		cancel: function() {

		}
	};
	
	describe("ProductDialogController testing modal", function () {
		beforeEach(inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();
			spyOn(mockDialog, "cancel");
			ProductDialogController = $controller("ProductDialogController", function () {
				$scope: scope,
				$mdDialog: mockDialog
			});
		}));

		it('should call cancel if modal is being closed', function () {
			scope.close();
			expect(mockDialog.cancel).toHaveBeenCalled();
		});
	});

	describe("ProductDialogController testing add product", function () {
		beforeEach(inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();
			spyOn(scope, "addProduct");
			ProductDialogController = $controller("ProductDialogController", function () {
				$scope: scope
			});
		}));

		it('should call addProduct with the given product', function () {
			var product = {
				id: 0,
				name: "",
				price: 0,
				quantitySold: 0,
				quantityInStock: 0,
				imagePath: ""
			}
			scope.addProduct(product);
			expect(scope.addProduct).toHaveBeenCalledWith(product);
		});
	});
});