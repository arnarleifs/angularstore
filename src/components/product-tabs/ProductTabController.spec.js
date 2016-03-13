"use strict";

describe("ProductTabController", function () {
	beforeEach(module("project3App"));

	var ProductTabController, scope;

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

	var mockHttpPromise = function(condition, data) {
		return {
			success: function(fn) {
				if (condition) {
					fn(data);
				}
				return {
					error: function (f) {
						if (!condition) {
							f();
						}
					}
				};
			}
		};
	};

	var mockResourceFalse = {
		addSellerProduct: function () {
			return mockHttpPromise(false, null);
		},
		getSellerProducts: function () {
			return mockHttpPromise(false, null);
		},
		updateSellerProduct: function () {
			return mockHttpPromise(false, null);
		}
	};

	var mockResourceTrue = {
		addSellerProduct: function () {
			return mockHttpPromise(true, mockProduct);
		},
		getSellerProducts: function () {
			return mockHttpPromise(true, mockProduct);
		},
		updateSellerProduct: function () {
			return mockHttpPromise(true, mockProduct);
		}
	};

	var mockDialog = {
		show: function () {

		}
	};

	describe("ProductTabController failed", function () {
		beforeEach(inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();
			spyOn(mockDialog, "show");
			ProductTabController = $controller("ProductTabController", {
				$scope: scope,
				$mdDialog: mockDialog,
				AppResource: mockResourceFalse,
				$mdToast: mockDialog
			});
		}));

		it('should open edit product dialog', function () {
			scope.editProduct();
			expect(mockDialog.show).toHaveBeenCalled();
		});

		it('should get error when retrieving seller products', function () {
			expect(scope.error).toBe(true);
		});

		it('should show failed toast when adding to product list', function () {
			scope.$emit('addToProductList', null);
			expect(mockDialog.show).toHaveBeenCalled();
		});

		it('should show failed toast when editing product', function () {
			scope.$emit('editProduct', null);
			expect(mockDialog.show).toHaveBeenCalled();
		});
	});

	describe("ProductTabController success", function () {
		beforeEach(inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();
			spyOn(mockDialog, "show");
			ProductTabController = $controller("ProductTabController", {
				$scope: scope,
				$mdDialog: mockDialog,
				AppResource: mockResourceTrue,
				$mdToast: mockDialog
			});
			scope.productList = [];
		}));

		it('should retrieve seller products', function () {
			expect(scope.error).toBe(false);
		});

		it('should show newly added product when adding to product list', function () {
			scope.$emit('addToProductList', mockProduct);
			expect(scope.productList).toContain(mockProduct);
		});

		it('should show newly edited seller when editing product', function () {
			scope.$emit('editProduct', mockProduct);
			expect(mockDialog.show).toHaveBeenCalled();
		});
	});
});