(function () {
    angular.module("WebDevProject")//readOnly
        .controller("profileController", profileController);


    function profileController(projectUserService, $location, user) {

        var model = this;
        model.userId = user._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function init() {
            projectUserService
                .findUserById(model.userId)
                .then(function (response) {
                    model.user = response.data;
                    console.log(user);
                })
        }

        init();

        function logout() {
           return projectUserService
                .logout()
                .then(function () {
                    $location.url('#!/');
                });
        }

        function updateUser(user) {
           projectUserService.updateUser(user._id, user);
            model.errorMessage = "Updated User";
        }
        function deleteUser(user) {
           projectUserService.deleteUser(user._id);
            $location.url("/login");
        }
    }
})();