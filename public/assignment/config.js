//The main purpose of this file is to configure the file
(function () {
    angular.module("WamApp")//readOnly
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
        $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';

        $routeProvider
            .when("/", {
                templateUrl: "views/home/templates/home.html",
                controller: "homeController",
                controllerAs: "model"
            })

            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })

            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })

            .when("/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve : {
                    user: checkLogin
                }
            })

            //website routes
            .when("/website", {
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model",
                resolve : {
                    user: checkLogin
                }
            })

            .when("/website/new", {
                templateUrl: "views/website/templates/website-new.view.client.html",
                controller: "websiteNewController",
                controllerAs: "model",
                resolve : {
                    user: checkLogin
                }
            })

            .when("/website/:webId", {
                templateUrl: "views/website/templates/website-edit.view.client.html",
                controller: "websiteEditController",
                controllerAs: "model",
                resolve : {
                    user: checkLogin
                }
            })

            .when("/website/:webId/page", {
                templateUrl: "views/page/templates/page-list.view.client.html",
                controller: "pageListController",
                controllerAs: "model",
                resolve : {
                    user: checkLogin
                }
            })

            .when("/website/:webId/page/new", {
                templateUrl: "views/page/templates/page-new.view.client.html",
                controller: "pageNewController",
                controllerAs: "model",
                resolve : {
                    user: checkLogin
                }
            })
            .when("/website/:webId/page/:pageId", {
                templateUrl: "views/page/templates/page-edit.view.client.html",
                controller: "pageEditController",
                controllerAs: "model",
                resolve : {
                    user: checkLogin
                }
            })

            .when("/website/:webId/page/:pageId/widget", {
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: "widgetListController",
                controllerAs: "model",
                resolve : {
                    user: checkLogin
                }
            })

            .when("/website/:webId/page/:pageId/widget/new", {
                templateUrl: "views/widget/templates/widget-choose.view.client.html",
                controller: "widgetChooseController",
                controllerAs: "model",
                resolve : {
                    user: checkLogin
                }
            })

            .when("/website/:webId/page/:pageId/widget/:widgetId", {
                templateUrl: "views/widget/templates/widget-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model",
                resolve : {
                    user: checkLogin
                }
            })

            .when("/website/:webId/page/:pageId/widget/:widgetId/flickr", {
                templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
                controller: "flickrImageSearchController",
                controllerAs: "model",
                resolve : {
                    user: checkLogin
                }
            })
    }

    function checkLogin(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .checkLogin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url("/login");
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }


})();