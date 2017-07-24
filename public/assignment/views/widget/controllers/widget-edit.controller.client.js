(function () {
    angular
        .module("WamApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, widgetService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.widget = widgetService.findWidgetById(model.widgetId);
        }
        init();

        function updateWidget(widget) {
            widgetService.updateWidget(model.widgetId, model.widget);
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId +
                "/widget");
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId +
                "/widget");
        }

    }

})();