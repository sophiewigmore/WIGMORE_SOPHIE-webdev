(function () {
    angular
        .module("WebDevProject")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;
        model.createUser = createUser;

        function init() {

        }

        init();

        function createUser(user) {
            if(!user) {
                model.error = "Blank User Data";
                return;
            }
            else {
                userService
                    .findUserByUsername(user.username)
                    .then(function (response) {
                        var _user = response.data;
                        if (!_user) {
                            userService
                                .register(user)
                                .then(function () {
                                    $location.url("/profile");
                                });
                        } else {
                            model.error = "Username taken, try something else";
                        }
                    });
            }
        }
    }
})();