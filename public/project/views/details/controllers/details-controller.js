(function () {
    angular
        .module("WebDevProject")
        .controller("detailsController", detailsController);

    function detailsController(articleService, $routeParams, user, projectUserService) {
        var model = this;
        model.nodeId = $routeParams['nodeId'];
        var currentUser = user;
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
            var nodeId = node.id;
            if(!currentUser) {
                model.errorMessage = "Sign in or register to save this post!";
            } else {
                currentUser.articles.push(nodeId);
                projectUserService
                    .updateUser(currentUser._id, currentUser)
                    .then(function (response) {
                        model.user = response.data;
                    })
            }
        }

    }

})();