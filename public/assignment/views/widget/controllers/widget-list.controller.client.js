(function () {
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, widgetService, $sce, user) {
        var model = this;
        model.userId = user._id;
        model.webId = $routeParams.webId;
        model.pageId = $routeParams.pageId;

        model.trustHtmlContent = trustHtmlContent;
        model.trustUrlResource = trustUrlResource;
        model.sort = sort;

        function init() {
            widgetService.findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                })
        }
        init();


        function trustHtmlContent(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }

        function trustUrlResource(url) {
            var youtubeUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            youtubeUrl += urlParts[urlParts.length-1];
            return $sce.trustAsResourceUrl(youtubeUrl);

        }

        function sort(initial, final) {
            widgetService
                .sort(model.pageId, initial, final);
        }

    }

})();