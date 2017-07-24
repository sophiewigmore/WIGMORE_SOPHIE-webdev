(function () {
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, widgetService, $sce) {
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;
        model.pageId = $routeParams.pageId;

        model.trustSrc = trustSrc;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        function trustSrc(src) {
            console.log(src);
            return $sce.trustAsResourceUrl(src.replace("watch?v=", "embed"));
        }

    }

})();