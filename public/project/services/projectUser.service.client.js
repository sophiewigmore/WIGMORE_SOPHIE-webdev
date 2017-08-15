(function () {
    angular
        .module("WebDevProject")
        .factory("projectUserService", projectUserService);

    function projectUserService($http) {
        var api = {
            "findUserById": findUserById,
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "findAllUsers" : findAllUsers,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "checkLogin" : checkLogin,
            "login" : login,
            "logout" : logout,
             "register": register,
            "searchUsers":searchUsers,
            "followUser" : followUser,
            "unfollowUser": unfollowUser,
            "followingUser" : followingUser,
            "loggedInAsAdmin" : loggedInAsAdmin
        };
        return api;

        function checkLogin() {
            return $http.get("/project/api/checkLogin")
               .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/project/api/login";
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
            var url = "/project/api/logout";
            console.log("trying to logout");
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(userObj) {
            var url = "/project/api/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/project/api/user";
            return $http.post(url, user);
        }

        function deleteUser(userId) {
            var url = "/project/api/user/"+userId;
            return $http.delete(url);
        }

        function updateUser(userId, user) {
            var url = "/project/api/user/"+userId;
            return $http.put(url, user)
        }

        function findUserByUsername(username) {
            var url = "/project/api/user?username="+username;
            return $http.get(url)
        }

        function findUserById(userId) {
            return $http.get("/project/api/user/" + userId);
        }

        function findAllUsers() {
            return $http.get("/project/api/users")
                .then(function (response) {
                    return response.data;
                })
        }

        function searchUsers(username) {
            var url = "/project/api/searchUsers?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function followUser(userId, otherUserId) {
            var url = "/project/api/follow?otherUserId=" + otherUserId + "&userId=" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function unfollowUser(userId, otherUserId) {
            var url = "/project/api/unfollow?otherUserId=" + otherUserId + "&userId=" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function followingUser(userId) {
            var url = "/project/api/followingUser?userId=" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function loggedInAsAdmin() {
            return $http.get("/project/api/isAdmin")
                .then(function (response) {
                    return response.data;
                });
        }

    }


})();