(function () {
    angular
        .module("WebDevProject")
        .factory("userService", userService);

    function userService($http) {
        var api = {
            "findUserById": findUserById,
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "checkLogin" : checkLogin,
            "login" : login,
            "logout" : logout,
             "register": register
        };
        return api;

        function checkLogin() {
            return $http.get("/api/checkLogin")
               .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(userObj) {
            var url = "/api/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/"+userId;
            return $http.delete(url);
        }

        function updateUser(userId, user) {
            var url = "/api/user/"+userId;
            return $http.put(url, user)
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url)
        }

        function findUserById(userId) {
            return $http.get("/api/user/" + userId);
        }
    }


})();