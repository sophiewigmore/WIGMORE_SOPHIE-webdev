(function () {
    angular
        .module("WamApp")
        .service("widgetService", widgetService);

    function widgetService($http) {
        var widgets = [
            {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        this.findWidgetsByPageId = findWidgetsByPageId;
        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function createWidget(pageId, widget) {
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;
            widgets.push(widget);
            return widget;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return widgets[w];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets[w] = widget;
                    return widgets[w];
                }
            }
            return null;
        }

        function deleteWidget(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                    return;
                }
            }
            return null;
        }
    }

})();