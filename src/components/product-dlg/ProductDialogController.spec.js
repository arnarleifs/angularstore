"use strict";

describe("ProductDialogController", function () {
	beforeEach(module("project3App"));

	var mockProduct = {
		id: 1,
		product: {
			id: 1,
			name: "productName",
			price: "price",
			quantitySold: "quantitySold",
			quantityInStock: "quantityInStock",
			imagePath: "path"
		}
	};

	var ProductDialogController, scope;

	var mockDialog = {
		cancel: function() {

		}
	};

	var mockRootScope = {
		$emit: function (eventName, data) {

		}
	};

	describe("ProductDialogController testing modal", function () {
		beforeEach(inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();
			spyOn(mockDialog, "cancel");
			ProductDialogController = $controller("ProductDialogController", {
				$scope: scope,
				$mdDialog: mockDialog,
				product: undefined,
				$rootScope: mockRootScope
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
			spyOn(mockDialog, "cancel");
			spyOn(mockRootScope, "$emit");
			ProductDialogController = $controller("ProductDialogController", {
				$scope: scope,
				$mdDialog: mockDialog,
				product: mockProduct,
				$rootScope: mockRootScope
			});
		}));

		it('should call addProduct with the given product', function () {
			scope.addProduct(mockProduct);
			expect(mockRootScope.$emit).toHaveBeenCalledWith('addToProductList', mockProduct);
			expect(mockDialog.cancel).toHaveBeenCalled();
		});

		it('should call editProduct with the given product', function () {
			scope.editProduct(mockProduct);
			expect(mockRootScope.$emit).toHaveBeenCalledWith('editProduct', mockProduct);
			expect(mockDialog.cancel).toHaveBeenCalled();
		});
	});
});