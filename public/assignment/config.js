//The main purpose of this file is to configure the file
(function () {
    angular.module("WamApp")//readOnly
    .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })

            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller : "registerController",
                controllerAs: "model"
            })

            .when("/profile/:userId", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller:  "profileController",
                controllerAs: "model"
            })

        //website routes
            .when("/user/:userId/website", {
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/new", {
                templateUrl: "views/website/templates/website-new.view.client.html",
                controller: "websiteNewController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/new", {
                templateUrl: "views/website/templates/website-new.view.client.html",
                controller: "websiteNewController",
                controllerAs: "model"
            })
    }
})();