(function () {
    angular.module("WebDevProject")//readOnly
        .controller("loginController", loginController);

    function loginController($location, projectUserService, $rootScope) {
        var model = this;
        model.login = login;
        function init() {}
        init();

        function login(user) {
            if (!user) {
                model.errorMessage = "User Not Found. Try Again, or Register.";
                return;
            }
            projectUserService
                .login(user.username, user.password)
                .then(function (user) {
                    if (user) {
                        $location.url("/profile");

                    } else {
                        model.errorMessage = "User Not Found. Try Again, or Register.";
                    }
                });
        }
    }

})();