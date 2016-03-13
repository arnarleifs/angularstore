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

    var mockSeller = {
        id: 1,
        name: "name",
        category: "category",
        imagePath: "img"
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
        getSellers: function () {
            return mockHttpPromise(false, null);
        },
        addSeller: function () {
            return mockHttpPromise(false, null);
        },
        updateSeller: function () {
            return mockHttpPromise(false, null);
        }
    };

    var mockResourceTrue = {
        getSellers: function () {
            return mockHttpPromise(true, mockSellerList);
        },
        addSeller: function () {
            return mockHttpPromise(true, mockSeller);
        },
        updateSeller: function () {
            return mockHttpPromise(true, mockSeller);
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
                $mdDialog: mdDialogMock,
                $mdToast: mdDialogMock
            });
        }));

        // Unit tests here
        it('should show error message on main site', function() {
            expect(scope.loadingListError).toBe(true);
            expect(scope.listOfSellers).toEqual([]);
        });

        it('should open add dialog', function () {
            scope.openDialog();
            expect(mdDialogMock.show).toHaveBeenCalled();
        });

        it('should open edit dialog', function () {
            scope.editSeller();
            expect(mdDialogMock.show).toHaveBeenCalled();
        });

        it('should fail to add user to sellerList', function () {
            scope.$emit('addToSellerList', mockSeller);
            expect(scope.listOfSellers).not.toContain(mockSeller);
        });

        it('should fail to edit user in seller list', function () {
            scope.$emit('editSeller', mockSeller);
            expect(mdDialogMock.show).toHaveBeenCalled();
        });
    });

    describe("List of sellers succeeded", function () {
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            spyOn(mdDialogMock, "show");
            SellersController = $controller('SellersController', {
                $scope: scope,
                AppResource: mockResourceTrue,
                $mdDialog: mdDialogMock,
                $mdToast: mdDialogMock
            });
        }));
        
        // Unit tests here
        it('should show list of sellers on the main site', function() {
            expect(scope.loadingListError).toBe(false);
            expect(scope.listOfSellers).not.toEqual([]);
        });

        it('should succeed to add user to sellerList', function () {
            scope.$emit('addToSellerList', mockSeller);
            expect(mdDialogMock.show).toHaveBeenCalled();
        });

        it('should succeed to edit user in seller list', function () {
            scope.$emit('editSeller', mockSeller);
            expect(mdDialogMock.show).toHaveBeenCalled();
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