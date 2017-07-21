(function () {
    angular.module("WamApp")//readOnly
        .controller("profileController", profileController)


    function profileController($routeParams, userService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            model.user = userService.findUserById(userId);
        }

        init();

        function updateUser(user) {
            userService.updateUser(user._id, user);
            model.errorMessage = "Updated User";
        }

        function unregister(user) {
            userService.unregister(user._id);
            $location.url("/login");
        }
    }
})();