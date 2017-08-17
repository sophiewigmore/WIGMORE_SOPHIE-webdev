(function () {
    angular.module("WebDevProject")//readOnly
        .controller("adminCreateController", adminCreateController);

    function adminCreateController(projectUserService, user, $location) {
        var model = this;
        model.admin = user;
        model.adminId = user._id;
        model.isAdmin = false;

        model.create = create;
        function init() {}
        init();

        function create(user) {
            if(!user) {
                model.error = "Blank User Data";
                return;
            }
            else {
                projectUserService
                    .findUserByUsername(user.username)
                    .then(function (response) {
                        var _user = response.data;
                        if (!_user) {
                            projectUserService
                                .register(user)
                                .then(function () {
                                    $location.url("/adminHome");
                                });
                        } else {
                            model.error = "Username taken, try something else";
                        }
                    });
            }
        }
    }
})();