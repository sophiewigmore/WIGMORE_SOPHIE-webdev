(function () {
    angular
        .module("WamApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, widgetService, $location, user) {
        var model = this;
        model.userId = user._id;
        model.webId = $routeParams.webId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        function init() {
            widgetService.findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });

            widgetService.findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                })
        }

        init();

        function updateWidget(widget) {
            widgetService.updateWidget(model.widgetId, model.widget)
                .then(function () {
                    $location.url("/website/" + model.webId + "/page/" + model.pageId +
                        "/widget");
                })
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId)
                .then(function () {
                    $location.url("/website/" + model.webId + "/page/" + model.pageId +
                        "/widget");
                })
        }

    }

})();