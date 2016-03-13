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
			return mockHttpPromise(false, null);
		}
	};

	var mockResourceTrue = {
		getSellerDetails: function () {
			return mockHttpPromise(true, null);
		}
	};

	var mdDialogMock = {
		show: function () {

		}
	};

	describe("Open dialog failed", function() {
		beforeEach(inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();
			spyOn(mdDialogMock, "show");
			SellerDetailsController = $controller('SellerDetailsController' , {
				$scope: scope,
				AppResoure: mockResourceFalse,
				$mdDialog: mdDialogMock
			});
		}));

		it('should show Error message', function () {
			scope.openDialog();
			expect(mdDialogMock.show).toHaveBeenCalled();
		});
	});

	describe("Open dialog success", function() {
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
	});








});
