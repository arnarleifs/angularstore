"use strict";

describe("SellersController", function() {
    // Inject the module to the test code
    beforeEach(module("project3App"));

    var SellersController, scope;

    var mockSellerList = [{
        id: 1,
        name: "Hannyrðaþjónusta Hannesar",
        category: "Fatnaður",
        imagePath: "http://i.imgur.com/OYVpe2W.jpg?fb"
    }];

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
        getSellers: function () {
            return mockHttpPromise(false, null);
        }
    };

    var mockResourceTrue = {
        getSellers: function () {
            return mockHttpPromise(true, mockSellerList);
        }
    };

    var mdDialogMock = {
        show: function () {

        }
    };

    var mockLocation = {
        path: function(route) {

        }
    };

    describe("List of sellers failed", function () {
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            spyOn(mdDialogMock, "show");
            SellersController = $controller('SellersController', {
                $scope: scope,
                AppResource: mockResourceFalse,
                $mdDialog: mdDialogMock
            });
        }));

        // Unit tests here
        it('should show error message on main site', function() {
            expect(scope.loadingListError).toBe(true);
            expect(scope.listOfSellers).toEqual([]);
        });

        it('should open dialog', function () {
            scope.openDialog();
            expect(mdDialogMock.show).toHaveBeenCalled();
        });
    });

    describe("List of sellers succeeded", function () {
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            SellersController = $controller('SellersController', {
                $scope: scope,
                AppResource: mockResourceTrue
            });
        }));
        
        // Unit tests here
        it('should show list of sellers on the main site', function() {
            expect(scope.loadingListError).toBe(false);
            expect(scope.listOfSellers).not.toEqual([]);
        });
    });

    describe("Successfully redirected to seller-detail page", function () {
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            spyOn(mockLocation, "path");
            SellersController = $controller('SellersController', {
                $scope: scope,
                $location: mockLocation
            });
        }));

        it('should redirect to seller-detail page', function () {
            scope.getSellerDetail(1);
            expect(mockLocation.path).toHaveBeenCalledWith('/seller-details/1');
        });
    });
});