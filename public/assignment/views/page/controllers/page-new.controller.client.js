(function () {
    angular
        .module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;
        model.pageId = $routeParams.pageId;

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.webId);
        }
        init();
    }

})();