(function () {
    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService, user) {
        var model = this;
        model.userId = user._id;
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