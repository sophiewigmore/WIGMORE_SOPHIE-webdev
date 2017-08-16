(function () {
    angular
        .module("WebDevProject")
        .controller("searchController", searchController);

    function searchController(articleService, user) {
        var model = this;
        model.searchArticle = searchArticle;
        model.parseNodes = parseNodes;

        function init() {
            model.currentUser = user;
        }
        init();

        function searchArticle(searchKeyword) {
            if(searchKeyword) {
                articleService
                    .searchArticle(searchKeyword)
                    .then(function (nodes) {
                        model.nodes = parseNodes(nodes);
                    });
            }
            else {
                model.errorMessage = "Enter a search item";
                return;
            }

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