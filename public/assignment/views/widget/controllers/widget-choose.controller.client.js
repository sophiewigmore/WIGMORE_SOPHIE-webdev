(function () {
    angular
        .module("WamApp")
        .controller("widgetChooseController", widgetChooseController);

    function widgetChooseController($routeParams, widgetService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;
        model.pageId = $routeParams.pageId;

        model.createWidget = createWidget;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        function createWidget(widget) {
            widgetService.createWidget(model.pageId, widget);
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId +
                "/widget/" + widget._id);
        }
    }

})();