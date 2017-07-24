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

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.webId);
            model.page = pageService.findPageById(model.pageId);
            console.log(model.page);
        }
        init();

        function updatePage(page) {
            console.log("im tring");
            pageService.updatePage(model.pageId, model.page);
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page");

        }

    }

})();