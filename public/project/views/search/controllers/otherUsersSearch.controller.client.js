(function () {
    angular
        .module("WebDevProject")
        .controller("otherUsersSearchController", otherUsersSearchController);

    function otherUsersSearchController(projectUserService, user, $routeParams, $location) {
        var model = this;
        model.searchUsers = searchUsers;
        model.userSearched = $routeParams.userSearched;

        function init() {
            model.currentUser = user;
            if(window.location.href.indexOf("searchUsers") > -1) {
                searchUsers(model.userSearched);
            }
        }
        init();

        function searchUsers(userSearched) {
            model.userSearched = userSearched;
            $location.url("/searchUsers/" + model.userSearched);
            projectUserService
                .searchUsers(model.userSearched)
                .then(function (users) {
                    model.otherUsers = users;
                });
        }

    }

})();