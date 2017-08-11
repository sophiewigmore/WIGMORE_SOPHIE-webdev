(function () {
    angular
        .module("WamApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, websiteService, $location, user) {
        var model = this;
        model.userId = user._id;
        model.webId = $routeParams.webId;

        model.createWebsite = createWebsite;

        function init() {
            websiteService.findWebsitesbyUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                })
        }

        init();


        function createWebsite(website) {
            websiteService.createWebsite(model.userId, website)
                .then(function () {
                    $location.url("/website");
                })
        }
    }

})();
