(function () {
    angular.module("WamApp")//readOnly
    .controller("loginController", loginController)

    function loginController($location, userService, $rootScope) {
        var model = this;
        model.login = login;
        function init() {

        }
        init();

        function login(user) {
            if(!user) {
            model.errorMessage = "User Not Found. Try Again, or Register.";
        }
            var user = userService.findUserByCredentials(model.user.username, model.user.password);
            if(user === null) {
                model.errorMessage = "User Not Found. Try Again, or Register.";
            } else {
                $rootScope.currentUser = user;
                $location.url("profile/" + user._id);
            }
        }
    }

})();