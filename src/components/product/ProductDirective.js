"use strict";

angular.module("project3App").directive("product", function () {
	return {
		restrict: "E", 
		templateUrl: "components/product/product.html"
	};
});