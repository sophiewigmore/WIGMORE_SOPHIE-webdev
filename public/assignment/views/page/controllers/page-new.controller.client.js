(function () {
    angular
        .module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService, $location, user) {
        var model = this;
        model.userId = user._id;
        model.webId = $routeParams.webId;
        model.pageId = $routeParams.pageId;

        model.createPage = createPage;

        function init() {
            pageService.findPagesByWebsiteId(model.webId)
                .then(function (pages) {
                    model.pages = pages;
                })
        }

        init();

        function createPage(page) {
            pageService.createPage(model.webId, page)
                .then(function () {
                    $location.url("/website/" + model.webId + "/page");
                })
        }
    }

})();