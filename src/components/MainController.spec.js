"use strict";

describe("MainController", function() {
	beforeEach(module("project3App"));

	var MainController, scope;

	var translateMock = {
		use: function (selection) {

		}
	};

	describe("Testing MainController", function() {
		beforeEach(inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();
			spyOn(translateMock, "use");
			MainController = $controller("MainController", {
				$scope: scope,
				$translate: translateMock
			});
		}));

		it("should change language to icelandic", function() {
			scope.changeLanguage("is");
			expect(translateMock.use).toHaveBeenCalledWith("is");
		});

		it("should change language to english", function() {
			scope.changeLanguage("en");
			expect(translateMock.use).toHaveBeenCalledWith("en");
		});
	});
});