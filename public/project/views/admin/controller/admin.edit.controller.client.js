(function () {
    angular.module("WebDevProject")//readOnly
        .controller("adminEditController", adminEditController);

    function adminEditController(projectUserService, user, $routeParams, $location, articleService) {
        var model = this;
        model.admin = user;
        model.adminId = user._id;
        model.userId = $routeParams.userId;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.unsaveArticle = unsaveArticle;
        function init() {
            projectUserService
                .findUserById(model.userId)
                .then(function (user) {
                    model.user = user.data;

                    model.user.actualArticleObjects = [];
                    model.user.followingActual = [];
                    for (var i = 0; i < model.user.articles.length; i++) {
                        var articleId = model.user.articles[i];
                        articleService
                            .getNodeDetails(articleId)
                            .then(function (article) {
                                var _article = JSON.parse(article).data;
                                model.user.actualArticleObjects.push(_article);
                            });
                    }

                    for (var x = 0; x < model.user.following.length; x++) {
                        var otherUserId = model.user.following[x];
                        projectUserService
                            .findUserById(otherUserId)
                            .then(function (otherUser) {
                                model.user.followingActual.push(otherUser.data);
                            });
                    }
                });
            projectUserService
                .followingUser(model.userId)
                .then(function (users) {
                    model.followingUser = users;
                })


        }

        init();

        function updateUser(user) {
            projectUserService.updateUser(user._id, user);
            model.errorMessage = "Updated User";
        }

        function deleteUser(user) {
            projectUserService.deleteUser(user._id);
            $location.url("/adminHome");
        }

        function unsaveArticle(article) {
            var articleIndex = model.user.actualArticleObjects.indexOf(article);
            model.user.actualArticleObjects.splice(articleIndex, 1);
            model.user.articles.splice(articleIndex, 1)[0];
            return updateUser(model.user);
        }

    }
})();