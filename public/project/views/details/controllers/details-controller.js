(function () {
    angular
        .module("WebDevProject")
        .controller("detailsController", detailsController);

    function detailsController(articleService, $routeParams, user, projectUserService, commentService) {
        var model = this;
        model.nodeId = $routeParams['nodeId'];
        model.currentUser = user;
        model.comment = null;
        model.saveArticle = saveArticle;
        model.createComment = createComment;

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
                    articleService
                        .getWikiText(model.wiki)
                        .then(function (wikiText) {
                            model.wikiText = wikiText;
                        })

                });

            commentService
                .getCommentsForNode(model.nodeId)
                .then(function (comments) {
                    model.comments = comments;
                })

        }

        init();
        function parseNode(node) {
            var parsedData = JSON.parse(node);
            return parsedData.data;
        }

        function saveArticle(node) {
            var nodeId = node.id;
            if(!model.currentUser) {
                model.errorMessage = "Sign in or register to save this post!";
            } else {
                model.currentUser.articles.push(nodeId);
                projectUserService
                    .updateUser(model.currentUser._id, model.currentUser)
                    .then(function (response) {
                        model.user = response.data;
                    })
                    .then(function () {
                        model.errorMessage2 = "Article Saved!";
                    })
            }
        }

        function createComment(nodeId, user, comment) {
            var userId = user._id;
            comment._node = nodeId;
            comment._user = userId;
            commentService
                .createComment(comment)
                .then(function (createdComment) {
                    commentService
                        .getCommentsForNode(nodeId)
                        .then(function (comments) {
                            model.comments = comments;
                            model.errorMessage3 = "Comment Created";
                        })
                })
        }


    }

})();