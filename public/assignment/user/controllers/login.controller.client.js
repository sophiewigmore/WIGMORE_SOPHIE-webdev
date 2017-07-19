(function () {
    angular.module("WamApp")//readOnly
    .controller("loginController", loginController)

    function loginController($scope, $location, userService) {

        $scope.login = login;
        function init() {

        }
        init();

        function login(user) {
            var user = userService.findUserbyUsernameAndPassword(user.username, user.password);
            if(user === null) {
                $scope.errorMessage = "User Not Found";
            } else {
                $location.url("profile/" + user._id);
            }
        }
    }

})();