"use strict";

describe("SellerDialogController", function () {
	beforeEach(module("project3App"));

	var SellerDialogController, scope, parent;

	var mockSeller = {
		id: 1,
		name: "name",
		category: "category",
		imagePath: "img"
	};

	var mdDialogMock = {
		cancel: function () {

		}
	};

	var mockRootScope = {
		$emit: function (eventName, data) {

		}
	};

	describe("testing addSeller", function () {
		beforeEach(inject(function ($rootScope, $controller, $compile) {
			scope = $rootScope.$new();
			spyOn(mdDialogMock, "cancel");
			spyOn(mockRootScope, "$emit");
			SellerDialogController = $controller("SellerDialogController", {
				$scope: scope,
				$mdDialog: mdDialogMock,
				seller: mockSeller,
				$rootScope: mockRootScope
			});
		}));
		
		it('should add a user to the seller list', function () {
			scope.addSeller(mockSeller);
			expect(mockRootScope.$emit).toHaveBeenCalledWith('addToSellerList', mockSeller);
			expect(mdDialogMock.cancel).toHaveBeenCalled();
		});

		it('should edit a user in the seller list', function () {
			scope.editSeller(mockSeller);
			expect(mockRootScope.$emit).toHaveBeenCalledWith('editSeller', mockSeller);
			expect(mdDialogMock.cancel).toHaveBeenCalled();
		});

		it('should be called when closing dialog', function () {
			scope.close();
			expect(mdDialogMock.cancel).toHaveBeenCalled();
		});
	});
});
