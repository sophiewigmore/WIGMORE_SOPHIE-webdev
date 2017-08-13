(function () {
    angular
        .module("WebDevProject")
        .controller("otherUsersSearchController", otherUsersSearchController);

    function otherUsersSearchController(projectUserService, user) {
        var model = this;
        model.searchUsers = searchUsers;

        function init() {
            model.currentUser = user;
        }
        init();

        function searchUsers(userSearched) {
            projectUserService
                .searchUsers(userSearched)
                .then(function (users) {
                    model.otherUsers = users;
                });
        }

    }

})();