(function () {
    angular
        .module("WamApp")
        .service("widgetService", widgetService);

    function widgetService() {
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
                "url": "https://youtube.com/embed/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        this.findWidgetsByPageId = findWidgetsByPageId;

        function findWidgetsByPageId(pageId) {
            var wdgts = [];
            for (var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    wdgts.push(widgets[w]);
                }
            }
            return wdgts
        }


    }

})();