(function () {
    angular.module("WamApp")//readOnly
        .controller("profileController", profileController);


    function profileController($routeParams, userService, $location, user) {

        var model = this;
        model.userId = user._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init() {
            userService.findUserById(model.userId)
            .then(function (response) {
                model.user = response.data;
            })
        }

        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function updateUser(user) {
            userService.updateUser(user._id, user);
            model.errorMessage = "Updated User";
        }

        function deleteUser(user) {
            userService.deleteUser(user._id);
            $location.url("/login");
        }
    }
})();