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

            pageService.findPageById(model.pageId)
                .then(function (page) {
                    model.page = page;
                })
        }

        init();

        function updatePage(page) {
            pageService.updatePage(model.pageId, model.page)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.webId + "/page");
                })
        }

        function deletePage() {
            pageService.deletePage(model.pageId)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.webId + "/page");
                })
        }
    }

})();