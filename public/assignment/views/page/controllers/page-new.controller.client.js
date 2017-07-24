(function () {
    angular
        .module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;
        model.pageId = $routeParams.pageId;

        model.createPage = createPage;

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.webId);
        }
        init();

        function createPage(page) {
            pageService.createPage(model.webId, page);
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page")
        }
    }

})();