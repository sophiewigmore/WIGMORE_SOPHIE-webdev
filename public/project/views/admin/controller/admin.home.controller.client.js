(function () {
    angular.module("WebDevProject")//readOnly
        .controller("adminHomeController", adminHomeController);

    function adminHomeController(projectUserService, $location, user) {
        var model = this;
        model.admin = user;
        model.adminId = user._id;
        model.logout = logout;
        model.deleteUser = deleteUser;

        function init() {
            projectUserService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                })
        }

        init();

        function logout() {
            return projectUserService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function deleteUser(userId) {
            return projectUserService
                .deleteUser(userId)
                .then(function () {
                    location.reload();
                })
        }

    }
})();