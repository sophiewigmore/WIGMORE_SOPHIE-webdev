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
            model.website = websiteService.findWebsiteById(model.webId);
            model.websites = websiteService.findWebsitesbyUser(model.userId);
        }
        init();

        function updateWebsite(website) {
            websiteService.updateWebsite(model.webId, model.website);
            $location.url("/user/" + model.userId + "/website");
        }

        function deleteWebsite(website) {
            websiteService.deleteWebsite(model.webId);
            $location.url("/user/" + model.userId + "/website");

        }



    }

})();
