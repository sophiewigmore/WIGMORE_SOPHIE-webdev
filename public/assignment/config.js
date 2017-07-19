//The main purpose of this file is to configure the file
(function () {
    angular.module("WamApp")//readOnly
    .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "user/templates/login.view.client.html"
            })

            .when("/register", {
                templateUrl: "user/templates/register.view.client.html"
            })

            .when("/profile/:userId", {
                templateUrl: "user/templates/profile.view.client.html"
            })
    }
})();