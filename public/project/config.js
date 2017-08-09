//The main purpose of this file is to configure the file
(function () {
    angular
        .module("WebDevProject")
        .config(configuration)
        .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);

    }]);

    function configuration($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
        $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';

        $routeProvider
            .when("/", {
                templateUrl: "views/search/templates/search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/details/:id", {
                templateUrl: "views/details/templates.details.html",
                controller: "detailsController",
                controllerAs: "model"
            })

    }
})();