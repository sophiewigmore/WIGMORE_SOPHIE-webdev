/**
 * Created by sophiewigmore on 7/19/17.
 */
(function () {
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
            return user;
        }

        function deleteUser(userId) {
            for (var u in users) {
                if (users[u]._id == userId) {
                    users.splice(u);
                    return;
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for (var u in users) {
                if (users[u]._id == userId) {
                    users[u] = user;
                    return users[u];
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username == username) {
                    return _user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username == username &&
                    _user.password == password) {
                    return _user;
                }
            }
            return null;
        }

        function findUserById(userId) {
            for (var u in users) {
                var _user = users[u];
                if (_user._id == userId) {
                    return _user;
                }
            }
            return null;
        }
    }


})();