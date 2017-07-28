(function () {
    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;

        function init() {
            websiteService.findWebsitesbyUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                })
        }
        init();
    }
})();