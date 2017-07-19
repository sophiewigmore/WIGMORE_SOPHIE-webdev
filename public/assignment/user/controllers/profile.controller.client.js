(function () {
     angular.module("WamApp")//readOnly
    .controller("profileController", profileController)


    function profileController($scope, $routeParams, userService) {
        var userId = $routeParams["userId"];

        $scope.updateUser = updateUser;
        $scope.unregister = unregsiter

        function init() {
            $scope.user = userService.findUserById(userId);
        }
        init();

        function updateUser() {

        }

        function unregister() {

        }
    }
})();