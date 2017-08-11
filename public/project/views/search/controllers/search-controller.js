(function () {
    angular
        .module("WebDevProject")
        .controller("searchController", searchController);

    function searchController(articleService, $rootScope) {
        var model = this;

        model.searchArticle = searchArticle;

        function searchArticle(searchKeyword) {
            if (!searchKeyword) {
                model.errorMessage = "Enter a search item";
                return;
            }
            articleService
                .searchArticle(searchKeyword)
                .then(function (nodes) {
                    model.nodes = parseNodes(nodes);
                });
        }

        function parseNodes(nodes) {
            var dataArray = JSON.parse(nodes);
            var nodesArray = [];
            for (var i = 0; i < dataArray.data.length; i++) {
                nodesArray.push(dataArray.data[i]);
            }
            return nodesArray;
        }
    }

})();