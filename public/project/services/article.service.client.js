(function () {
    angular
        .module("WebDevProject")
        .factory("articleService", articleService);

    function articleService($http) {
        var api = {
            "searchArticle" : searchArticle,
            "getNodeDetails" : getNodeDetails,
            "getWikiDetails" : getWikiDetails,
            "getWikiText" : getWikiText,
            "getContributor" : getContributor
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

        function getWikiText(wikiId) {
            return $http.get("/api/wikiText/" + wikiId)
                .then(function (response) {
                    return response.data;
                })
        }

        function getContributor(nodeId) {
            return $http.get("/api/contributor/" + nodeId)
                .then(function (response) {
                    return response.data;
                })
        }


    }
})();