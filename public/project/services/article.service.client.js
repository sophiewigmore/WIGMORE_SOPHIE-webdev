(function () {
    angular
        .module("WebDevProject")
        .factory("articleService", articleService);

    function articleService($http) {
        var api = {
            "searchArticle" : searchArticle
        };
        return api;

        function searchArticle(searchKeyword) {
            return $http.get("/api/search/" + searchKeyword)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();