(function () {
    angular.module("WebDevProject")//readOnly
        .controller("profileController", profileController);


    function profileController(projectUserService, articleService, $location, user) {

        var model = this;
        model.userId = user._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.unsaveArticle = unsaveArticle;



        function init() {
            projectUserService
                .followingUser(model.userId)
                .then(function (users) {
                    model.followingUser = users;
                })
            projectUserService
                .findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
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
                })


        }

        init();

        function logout() {
            return projectUserService
                .logout()
                .then(function () {
                    $location.url('#!/');
                });
        }

        function updateUser(user) {
            projectUserService.updateUser(user._id, user);
            model.errorMessage = "Updated User";
        }

        function deleteUser(user) {
            projectUserService.deleteUser(user._id);
            $location.url("/login");
        }

        function unsaveArticle(article) {
            var articleIndex = model.user.actualArticleObjects.indexOf(article);
            model.user.actualArticleObjects.splice(articleIndex, 1);
            model.user.articles.splice(articleIndex, 1)[0];
        }
    }
})();