(function () {
    angular.module("WamApp")//readOnly
        .controller("profileController", profileController);


    function profileController($routeParams, userService, $location, user) {

        var model = this;
        model.userId = $routeParams.userId;
        var userId = user._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            userService.findUserById(model.userId)
            .then(function (response) {
                model.user = response.data;
            })
        }

        init();

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