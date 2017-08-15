(function () {
    angular.module("WebDevProject")//readOnly
        .controller("adminEditController", adminEditController);

    function adminEditController(projectUserService, $location, user, $routeParams) {
        var model = this;
        model.admin = user;
        model.adminId = user._id;
        model.userId = $routeParams.userId;


        function init() {
            projectUserService
                .findUserById(userId)
                .then(function (user) {
                    model.user = user;
                })
        }

        init();

    }
})();