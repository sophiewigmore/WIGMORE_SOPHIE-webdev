(function () {
    angular
        .module("WebDevProject")
        .factory("articleService", articleService);

    function articleService($http) {
        var api = {
            "searchArticle" : searchArticle,
            "getNodeDetails" : getNodeDetails,
            "getWikiDetails" : getWikiDetails,
            "saveArticle" : saveArticle
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

        function getWikiDetails(nodeId) {
            return $http.get("/api/wiki/" + nodeId)
                .then(function (response) {

                    return response.data;
                })
        }

        function saveArticle(userId, article) {
            var url = "/project/api/user/" + userId + "/article";
            return $http.post(url, article);
        }
    }
})();