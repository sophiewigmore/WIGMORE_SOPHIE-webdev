(function () {
    angular
        .module("WamApp")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, pageService, user) {
        var model = this;
        model.userId = user._id;
        model.webId = $routeParams.webId;
        model.pageId = $routeParams.pageId;

        function init() {
            pageService.findPagesByWebsiteId(model.webId)
                .then(function (pages) {
                    model.pages = pages;
            })
        }
        init();
    }

})();