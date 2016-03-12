"use strict";

describe("ProductTabController", function () {
	beforeEach(module("project3App"));

	var ProductTabController, scope;

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
			return mockHttpPromise(true, null);
		},
		getSellerProducts: function () {
			return mockHttpPromise(true, null);
		},
		updateSellerProduct: function () {
			return mockHttpPromise(true, null);
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
				AppResource: mockResourceFalse
			});
		}));

		it('should open edit product dialog', function () {
			scope.editProduct();
			expect(mockDialog.show).toHaveBeenCalled();
		});
	});
});