(function () {
    angular
        .module("WamApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService.findWebsiteById(model.userId, model.webId)
                .then(function (website) {
                    model.website = website;
                });

            websiteService.findWebsitesbyUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();

        function updateWebsite(website) {
            websiteService.updateWebsite(model.userId, model.webId, model.website)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website");
                })
        }

        function deleteWebsite(website) {
            websiteService.deleteWebsite(model.userId, model.webId)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website");
                })
        }
    }

})();
