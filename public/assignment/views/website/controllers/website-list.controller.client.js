(function () {
    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;

        function init() {
            model.websites = websiteService.findWebsitesbyUser(model.userId);
        }
        init();
    }
})();