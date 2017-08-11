(function () {
    angular
        .module("WebDevProject")
        .controller("detailsController", detailsController);

    function detailsController(articleService, $routeParams) {
        var model = this;
        model.nodeId = $routeParams['nodeId'];


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
                    console.log(model.wiki);
                });

        }

        init();
        function parseNode(node) {
            var parsedData = JSON.parse(node);
            return parsedData.data;
        }

    }

})();