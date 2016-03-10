"use strict";

angular.module("project3App", ["ngRoute", "ui.bootstrap", "ngMaterial", "ngMessages", "pascalprecht.translate"])
.config(function ($routeProvider, $translateProvider) {
	$routeProvider.when("/", {
		controller: "SellersController",
		templateUrl: "components/sellers/index.html"
	})
	.when("/seller-details/:id", {
		controller: "SellerDetailsController",
		templateUrl: "components/seller-details/seller-details.html"
	});
	
	$translateProvider.useStaticFilesLoader({
		prefix: 'lang_',
		suffix: '.json'
	});
	$translateProvider.preferredLanguage('is');
});
