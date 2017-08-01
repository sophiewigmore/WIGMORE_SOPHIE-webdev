(function () {
    angular
        .module("WamApp")
        .service("widgetService", widgetService);

    function widgetService($http) {
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.sort = sort;

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" +widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }

        function sort(pageId, initial, final) {
            var url = "/api/page/"+pageId+"/widget?initial="+initial+"&final="+final;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }

})();