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
                .followingUser(model.otherUserId)
                .then(function (users) {
                    model.followingOtherUser = users;
                });

            projectUserService
                .findUserById(model.otherUserId)
                .then(function (response) {
                    model.otherUser = response.data;
                    model.otherUser.actualArticleObjects = [];
                    model.otherUser.followingActual = [];
                    for (var i = 0; i < model.otherUser.articles.length; i++) {
                        var articleId = model.otherUser.articles[i];
                        articleService
                            .getNodeDetails(articleId)
                            .then(function (article) {
                                var _article = JSON.parse(article).data;
                                model.otherUser.actualArticleObjects.push(_article);
                            });
                    }
                    for (var i = 0; i < model.otherUser.following.length; i++) {
                        var otherUserFollowingId = model.otherUser.following[i];
                        projectUserService
                            .findUserById(otherUserFollowingId)
                            .then(function (otherUserFollowing) {
                                model.otherUser.followingActual.push(otherUserFollowing.data);
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