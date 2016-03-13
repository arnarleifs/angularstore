"use strict";

describe("SellerDetailsController", function(){
	beforeEach(module("project3App"));

	var SellerDetailsController, scope;


	var mockSellerDetails = {
		id: 1,
		name: "Bruce Dickinson",
		category: "music and dragons",
		imagePath: "http://ironmaiden-bg.com/en/images/stories/eddie.jpg"		
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
		getSellerDetails: function () {
			return mockHttpPromise(false, { });
		}
	};

	var mockResourceTrue = {
		getSellerDetails: function () {
			return mockHttpPromise(true, mockSellerDetails);
		}
	};

	var mdDialogMock = {
		show: function () {
		}
	};

	var mockLocation = {
		path: function (path) {

		}
	};

	describe("AppResource failed", function() {
		beforeEach(inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();
			spyOn(mdDialogMock, "show");
			spyOn(mockLocation, "path");
			SellerDetailsController = $controller('SellerDetailsController' , {
				$scope: scope,
				AppResource: mockResourceFalse,
				$mdDialog: mdDialogMock,
				$location: mockLocation
			});
		}));

		it('should show Error message', function () {
			scope.openDialog();
			expect(mdDialogMock.show).toHaveBeenCalled();
		});

		it('should return an empty object', function () {
			expect(scope.seller).toEqual({ });
		});

		it("should redirect to the path '/' ", function () {
			expect(mockLocation.path).toHaveBeenCalledWith("/");
		});
	});

	describe("AppResource success", function() {
		beforeEach(inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();
			spyOn(mdDialogMock, "show");
			SellerDetailsController = $controller('SellerDetailsController', {
				$scope: scope,
				AppResource: mockResourceTrue,
				$mdDialog: mdDialogMock
			});
		}));

		it('should open a dialog', function() {
			scope.openDialog();
			expect(mdDialogMock.show).toHaveBeenCalled();
		});

		it('should show return the seller with name Bruce', function() {
			expect(scope.seller.name).toEqual("Bruce Dickinson");
		});
	});

});
