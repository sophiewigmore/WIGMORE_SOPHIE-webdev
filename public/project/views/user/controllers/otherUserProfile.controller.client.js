(function () {
    angular.module("WebDevProject")//readOnly
        .controller("otherUserProfileController", otherUserProfileController);


    function otherUserProfileController(projectUserService, user, $routeParams, articleService) {
        var model = this;
        model.followUser = followUser;
        model.unfollowUser = unfollowUser;

        function init() {
            model.loggedInUser = user;
            model.loggedInUserId = user._id;
            model.otherUserId = $routeParams["userId"];


            projectUserService
                .findUserById(model.otherUserId)
                .then(function (response) {
                    model.otherUser = response.data;
                    model.otherUser.actualArticleObjects = [];
                    for (var i = 0; i < model.otherUser.articles.length; i++) {
                        var articleId = model.otherUser.articles[i];
                        articleService
                            .getNodeDetails(articleId)
                            .then(function (article) {
                                var _article = JSON.parse(article).data;
                                model.otherUser.actualArticleObjects.push(_article);
                            });
                    }
                })
        }
        init();

        function followUser(loggedInUserId, otherUserId) {
            projectUserService
                .followUser(loggedInUserId, otherUserId)
                .then(function (user) {
                    model.loggedInUser = user;
                })
        }

        function unfollowUser(loggedInUserId, otherUserId) {
            projectUserService
                .unfollowUser(loggedInUserId, otherUserId)
                .then(function (user) {
                    model.loggedInUser = user;
                })
        }


    }
})();