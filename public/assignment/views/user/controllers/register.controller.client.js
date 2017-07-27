(function () {
    angular.module("WamApp")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;
        model.createUser = createUser;

        function init() {

        }

        init();

        function createUser(user) {
            userService.findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;

                    if (_user == 0) {
                        userService.createUser(user)
                            .then(function (response) {
                                _user = response.data;
                                $location.url("/profile/" + _user._id);
                            });
                    } else {
                        model.error = "Username taken, try something else";
                    }
                });
        }
    }
})();