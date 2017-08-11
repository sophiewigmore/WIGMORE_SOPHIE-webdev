(function () {
    angular
        .module("WamApp")
        .controller("widgetChooseController", widgetChooseController);

    function widgetChooseController($routeParams, widgetService, $location, user) {
        var model = this;
        model.userId = user._id;
        model.webId = $routeParams.webId;
        model.pageId = $routeParams.pageId;

        model.createWidget = createWidget;

        function init() {
            widgetService.findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                })
        }
        init();

        function createWidget(widget) {
            widgetService.createWidget(model.pageId, widget)
                .then(function (widget) {
                    $location.url("/website/" + model.webId + "/page/" + model.pageId + "/widget/" + widget._id);
                })
        }
    }

})();