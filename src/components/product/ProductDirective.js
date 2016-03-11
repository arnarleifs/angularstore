"use strict";

angular.module("project3App").directive("product", function () {
	return {
		restrict: "E", 
		priority: 1001,
		templateUrl: "components/product/product.html"
	};
});