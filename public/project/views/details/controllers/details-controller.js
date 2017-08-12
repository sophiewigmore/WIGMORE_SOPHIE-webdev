(function () {
    angular
        .module("WebDevProject")
        .controller("detailsController", detailsController);

    function detailsController(articleService, $routeParams, user) {
        var model = this;
        model.nodeId = $routeParams['nodeId'];
        model.userId = user._id;

        model.saveArticle = saveArticle;


        function init() {
            articleService
                .getNodeDetails(model.nodeId)
                .then(function (node) {
                    model.node = parseNode(node);
                });

            articleService
                .getWikiDetails(model.nodeId)
                .then(function (wiki) {
                    model.wiki = JSON.parse(wiki).data[0].id;
                });

        }

        init();
        function parseNode(node) {
            var parsedData = JSON.parse(node);
            return parsedData.data;
        }

        function saveArticle(node) {
            articleService
                .createArticle(model.userId, node);
        }

    }

})();