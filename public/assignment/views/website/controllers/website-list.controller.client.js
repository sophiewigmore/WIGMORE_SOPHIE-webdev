(function () {
    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService) {
        var model = this;
        var userId = $routeParams.userId;


        function init() {
            model.wbesites = websiteService.findWebsitesForUser(userId);
        }
        init();
    }
})