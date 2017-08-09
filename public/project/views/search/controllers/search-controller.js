(function () {
    angular
        .module("WebDevProject")
        .controller("searchController", searchController);

    function searchController(articleService) {
        var model = this;

        model.searchArticle = searchArticle;

        function searchArticle(searchKeyword) {
            if (!searchKeyword) {
                model.errorMessage = "Enter a search item";
                return;
            }
            articleService
                .searchArticle(searchKeyword)
                .then(function (articles) {
                    console.log(articles);
                });
        }

        /*        function renderArticles(articles) {
         model.articles = articles;
         }*/
    }

})();