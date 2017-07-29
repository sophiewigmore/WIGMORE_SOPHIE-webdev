(function () {
    angular
        .module("WamApp")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, pageService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;
        model.pageId = $routeParams.pageId;

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            pageService.findPagesByWebsiteId(model.webId)
                .then(function (pages) {
                    model.pages = pages;
                })

            model.page = pageService.findPageById(model.pageId);
        }
        init();

        function updatePage(page) {
            pageService.updatePage(model.pageId, model.page);
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page");
        }

        function deletePage() {
            pageService.deletePage(model.pageId);
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page");
        }
    }

})();