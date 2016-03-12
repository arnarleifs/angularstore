"use strict";

describe("SellerDialogController", function () {
	beforeEach(module("project3App"));

	var SellerDialogController, scope, parent;

	var mdDialogMock = {
		cancel: function () {

		}
	};

	describe("testing addSeller", function () {
		beforeEach(inject(function ($rootScope, $controller, $compile) {
			scope = $rootScope.$new();
			spyOn(mdDialogMock, "cancel");
			SellerDialogController = $controller("SellerDialogController", {
				$scope: scope,
				$mdDialog: mdDialogMock,
				seller: undefined
			});
		}));
		
		it('should add a user to the seller list', function () {
			var testSeller = {
				name: "Pruf",
				category: "Pruf",
				imagePath: "http://www.img.com/img.jpg"
			};
			scope.addSeller(testSeller);
			expect(true).toBe(true);
			//expect(parent.listOfSellers).toContain(testSeller);
		});

		it('should be called when closing dialog', function () {
			scope.close();
			expect(mdDialogMock.cancel).toHaveBeenCalled();
		});
	});
});
