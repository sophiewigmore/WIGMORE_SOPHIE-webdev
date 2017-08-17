(function () {
    angular
        .module("WebDevProject")
        .controller("searchController", searchController);

    function searchController(articleService, user, $location, $routeParams) {
        var model = this;
        model.searchArticle = searchArticle;
        model.parseNodes = parseNodes;
        model.searchKeyword = $routeParams.searchKeyword;

        function init() {
            model.currentUser = user;
            if(window.location.href.indexOf("search") > -1) {
                searchArticle(model.searchKeyword)
            }
        }
        init();

        function searchArticle(searchKeyword) {
            if(searchKeyword) {
                model.searchKeyword = searchKeyword;
                $location.url("/search/" + model.searchKeyword);
                articleService
                    .searchArticle(model.searchKeyword)
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