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
			var el = angular.element('<div ng-controller="SellersController"><div ng-controller="SellerDialogController"></div></div>');
			$compile(el)(scope);
			parent = el.scope();
			SellerDialogController = $controller("SellerDialogController", {
				$scope: scope,
				$mdDialog: mdDialogMock
			});
		}));
		
		it('should add a user to the seller list', function () {
			var testSeller = {
				name: "Pruf",
				category: "Pruf",
				imagePath: "http://www.img.com/img.jpg"
			};
			scope.addSeller(testSeller);
			expect(parent.listOfSellers).toContain(testSeller);
		});

		it('should be called when closing dialog', function () {
			scope.close();
			expect(mdDialogMock.cancel).toHaveBeenCalled();
		});
	});
});
