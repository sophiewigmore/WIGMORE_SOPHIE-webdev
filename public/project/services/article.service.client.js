(function () {
    angular
        .module("WebDevProject")
        .factory("articleService", articleService);

    function articleService($http) {
        var api = {
            "searchArticle" : searchArticle,
            "getNodeDetails" : getNodeDetails
        };
        return api;

        function searchArticle(searchKeyword) {
            return $http.get("/api/search/" + searchKeyword)
                .then(function (response) {
                    return response.data;
                });
        }

        function getNodeDetails(nodeId) {
            return $http.get("/api/details/" + nodeId)
                .then(function (response) {
                    return response.data;
                })
        }

    }
})();